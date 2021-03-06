import React from 'react';
import Tesseract from 'tesseract.js';
import {createWorker, createScheduler } from 'tesseract.js';
import PickImages from './PickImages.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import SkaterExtractorInfo from './SkaterExtractorInfo.js';

class SkaterExtractor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePaths: [],
            pickOptions: { 1: [], 2: [], 3: [] },
            showInfo: false
        }
        this.addImageToPick = this.addImageToPick.bind(this);
        this.convertImagesToSkaters = this.convertImagesToSkaters.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind(this);
        this.pickRe = new RegExp('pick #([1-3])', 'i');
        this.appMenuRe = new RegExp('Home Order Scan Offers Account');
        this.gameMenuRe = new RegExp('Play History Leaderboard Game Info');
    }

    addImageToPick(event) {
        let imagePaths = [];
        for (let i = 0; i < event.target.files.length; ++i) {
            imagePaths.push(URL.createObjectURL(event.target.files[i]));
        }
        this.setState({
            imagePaths: [...imagePaths]
        });
    }

    getNamesMetadata(data) {
        /**
         * Find where the 3 reference texts are located.  All 3 must exist and
         * two must be adjacent.  With one exception: if there is no pick line
         * then this must be a pick 3 end of list screenshot.
         */
        let appMenuLine = null;
        let gameMenuLine = null;
        let pickLine = null;
        for (let line = 0; line < data.lines.length; ++line) {
            const text = data.lines[line].text;
            if (this.gameMenuRe.test(text)) {
                gameMenuLine = line;
                continue;
            }
            if (this.appMenuRe.test(text)) {
                appMenuLine = line;
                continue;
            }
            if (this.pickRe.test(text)) {
                pickLine = line;
                continue;
            }
        }
        /**
         * end of pick 3 list
         * names start after game menu line
         * pick is 3
         */
        if (!pickLine) {
            return {
                line: parseInt(gameMenuLine) + 1,
                pick: 3,
                appMenuLine
            };
        }
        /**
         * start of pick # list
         * names start after pick # line
         * pick number is same as matched pick number
         */
        if (gameMenuLine + 1 === pickLine) {
            const pickMatches = data.lines[pickLine].text.match(this.pickRe);
            return {
                line: parseInt(pickLine) + 1,
                pick: parseInt(pickMatches[1]),
                appMenuLine
            };
        }
        /**
         * end of pick # list
         * names start after game menu at top
         * pick # is matched pick minus 1
         */
        if (pickLine + 2 === appMenuLine) {
            const pickMatches = data.lines[pickLine].text.match(this.pickRe);
            return {
                line: parseInt(gameMenuLine) + 1,
                pick: parseInt(pickMatches[1]) - 1,
                appMenuLine
            }
        }
        /**
         * this isn't good.  no idea what's going on.  the schnoz berries taste
         * like schnoz berries
        */
        return null;
    }

    extractNames(data) {
        let names = { 1: [], 2: [], 3: [] };
        const namesMeta = this.getNamesMetadata(data);
        if (!namesMeta) { return; }
        let { line, pick, appMenuLine } = namesMeta;
        for (; line < appMenuLine; ++line) {
            names[pick].push(data.lines[line].words);
        }
        return names;
    }

    convertImagesToSkaters(event) {
        console.log("converting", this.state);
        /**
         * TODO: replace tesseract.recognize with proper worker api
            const { createWorker } = require('tesseract.js');

            const worker = createWorker({
            logger: m => console.log(m), // Add logger here
            });

            (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
            console.log(text);
            await worker.terminate();
            })();
            */

        /**
         * TODO: multiple workers with scheduler
        const { createWorker, createScheduler } = require('tesseract.js');

        const scheduler = createScheduler();
        const worker1 = createWorker();
        const worker2 = createWorker();

        (async () => {
        await worker1.load();
        await worker2.load();
        await worker1.loadLanguage('eng');
        await worker2.loadLanguage('eng');
        await worker1.initialize('eng');
        await worker2.initialize('eng');
        scheduler.addWorker(worker1);
        scheduler.addWorker(worker2);
        // Add 10 recognition jobs
        const results = await Promise.all(Array(10).fill(0).map(() => (
            scheduler.addJob('recognize', 'https://tesseract.projectnaptha.com/img/eng_bw.png')
        )))
        console.log(results);
        await scheduler.terminate(); // It also terminates all workers.
        })();
            */
        const scheduler = createScheduler();
        let workers = [];
        for( let i = 0; i < this.state.imagePaths.length; ++i ){
            workers.push( createWorker() );
        }
        ( async () => {
            
        })();
        this.state.imagePaths.map(imagePath => {
            console.log('running tesseract', imagePath);

            Tesseract.recognize(
                imagePath,
                'eng',
            )
                .catch(err => { console.log('Tesseract error', err) })
                .then(result => {
                    console.log('result', result)
                    const namesRaw = this.extractNames(result.data);
                    console.log('raw', namesRaw)
                    const namesClean = this.cleanUpResultsData(namesRaw);
                    console.log('clean', namesClean)
                    const pickNumber = this.getPickNumberFromResultsData(namesRaw);
                    console.log('pickNumber', pickNumber);
                    namesClean.forEach(name => {
                        this.props.changeSelectedSkater({ name: name, choice: pickNumber })
                    });
                })
                .finally( () => {
                    console.log( 'tesseract finished')
                });
        });
    }

    getPickNumberFromResultsData(resultsData) {
        return Object.keys(resultsData).reduce((prev, cur) => {
            if (resultsData[cur].length > 0) {
                return cur;
            }
            return prev;
        }, null);
    }

    cleanUpResultsData(resultsData) {
        const pickNumber = this.getPickNumberFromResultsData(resultsData);

        const nameReg = new RegExp(/^[a-z\-']+$/, 'i');

        const cleanNames = resultsData[pickNumber].reduce((cleanNames, line) => {
            if (line.length > 1) {
                const filteredWords = line.reduce((filteredWords, lineItem) => {
                    if (lineItem.text.length > 1 && lineItem.text.match(nameReg)) {
                        filteredWords.push(lineItem.text)
                    } else {
                        /**
                         * TODO: collect and list names that weren't found in
                         * skaters list
                         */
                        console.log('bad name', lineItem.text);
                    }
                    return filteredWords;
                }, []);
                cleanNames.push(filteredWords.join(' '));
            }
            return cleanNames;
        }, [])

        return cleanNames;
    }
    handleInfoClick(event) {
        this.setState({ showInfo: !this.state.showInfo })
    }

    render() {
        return <div>
            {/* <PickImages pickNumber="1" addImage={this.addImageToPick} /> */}
            <input type="file" onChange={this.addImageToPick} multiple />
            <FontAwesomeIcon icon={faBarcode} onClick={this.convertImagesToSkaters} />,
            {/* <FontAwesomeIcon icon={faCircleInfo} onClick={this.handleInfoClick} /> */}
            {/* <SkaterExtractorInfo showInfo={this.state.showInfo} /> */}
        </div>
    }
}

export default SkaterExtractor;