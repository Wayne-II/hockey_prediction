import React from 'react';
import Tesseract from 'tesseract.js';
import PickImages from './PickImages.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';

class SkaterExtractor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePaths: { 1: [], 2: [], 3: [] },
            pickNumber: 1
        }
        this.addImageToPick = this.addImageToPick.bind(this);
        this.convertImagesToSkaters = this.convertImagesToSkaters.bind(this);
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
            imagePaths: {
                [this.state.pickNumber]: imagePaths
            }
        });
    }
    setUploadPickNumber(event) {
        this.setState({ pickNumber: event.target.value });
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
        console.log('convert', this.state);
        this.state.imagePaths[this.state.pickNumber].map(imagePath => {
            Tesseract.recognize(
                imagePath,
                'eng',
            )
                .catch(err => { console.log(err) })
                .then(result => {
                    console.log(result);
                    const names = this.extractNames(result.data);
                    console.log(names);
                });
        });

    }

    render() {
        let pickOptions = [];
        for (let i = 0; i < 3; ++i) {
            pickOptions.push(<option value={i + 1}>{i + 1}</option>);
        }
        return <div>
            <PickImages pickNumber="1" addImage={this.addImageToPick} />
            <select onChange={this.setUploadPickNumber}>
                {pickOptions}
            </select>
            <input type="file" onChange={this.addImageToPick} multiple />
            <FontAwesomeIcon icon={faBarcode} onClick={this.convertImagesToSkaters} />,
        </div>
    }
}

export default SkaterExtractor;