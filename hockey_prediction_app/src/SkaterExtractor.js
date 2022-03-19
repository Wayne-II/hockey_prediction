import React from 'react';
import Tesseract from 'tesseract.js';
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
            showInfo:false
        }
        this.addImageToPick = this.addImageToPick.bind(this);
        this.convertImagesToSkaters = this.convertImagesToSkaters.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind( this );
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
        this.state.imagePaths.map(imagePath => {
            Tesseract.recognize(
                imagePath,
                'eng',
            )
                .catch(err => { console.log('Tesseract error', err) })
                .then(result => {
                    const namesRaw = this.extractNames(result.data);
                    const namesClean = this.cleanUpResultsData(namesRaw);
                    const pickNumber = this.getPickNumberFromResultsData(namesRaw);
                    namesClean.forEach( name => {
                        this.props.changeSelectedSkater( { name:name, choice:pickNumber } )
                    });
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
                    }else{
                        /**
                         * TODO: collect and list names that weren't found in
                         * skaters list
                         */
                        console.log( 'bad name', lineItem.text );
                    }
                    return filteredWords;
                }, []);
                cleanNames.push( filteredWords.join( ' ' ) );
            }
            return cleanNames;
        }, [])

        return cleanNames;
    }
    handleInfoClick(event){
        this.setState({showInfo:!this.state.showInfo})
    }

    render() {
        return <div>
            <PickImages pickNumber="1" addImage={this.addImageToPick} />
            <input type="file" onChange={this.addImageToPick} multiple />
            <FontAwesomeIcon icon={faBarcode} onClick={this.convertImagesToSkaters} />,
            <FontAwesomeIcon icon={faCircleInfo} onClick={this.handleInfoClick} />
            <SkaterExtractorInfo showInfo={this.state.showInfo} />
        </div>
    }
}

export default SkaterExtractor;