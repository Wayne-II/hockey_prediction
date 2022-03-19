import React from 'react';
import first_pick from './images/first_pick.png';
import last_pick from './images/last_pick.png';
import last_3rd_pick from './images/3rd_pick_last_pick.png';

class SkaterExtractorInfo extends React.Component {
    render() {
        return <div style={{ display: this.props.showInfo ? 'flex' : 'none' }}>
            <h1>Skater Extractor Information</h1>
            <h2>How it works</h2>
            <p>
                This feature uses technology developed by Google called OCR.
                OCR stands for "Optical Character Recognition" and it allows
                software to extract text from images.  This is the easiest and
                quickest way to use this app.
            </p>
            <h2>How to use it</h2>
            <h3>Introduction</h3>
            <p>
                In order to use this app, you need to submit images to the app
                so that we can pass this data to the Google libraries and get
                the text back.  The screenshots are usually made by pressing
                the volume up and lock buttons at the same time.  Your device
                may vary.  Google is your friend.
            </p>
            <p>
                Contrary to popular belief, computers aren't very smart, so the
                screenshots submitted must be taken in a particular state.
                This allows me to be able to automaticall determin which "Pick #"
                the screenshots belong to and make figureing everything out as
                easy as uploading pictures to social media.
            </p>
            <h3>Step 1 - Taking the screenshots</h3>
            <p>
                In order to determin which pick a particular screenshot is
                intended for the screenshots need to resemble one of the
                following 3 examples.
            </p>
            <p>
                Your screen when you first load the app should look something like the following image.
                <span>TODO: empty picks list image</span>
            </p>
            <p>
                Each pick will usually need 2 screenshots.  The first of which 
                should align the words "Pick #" and the actual pick number just 
                below the games menu at the top of the app.  Example below.
                <img src={first_pick} />
            </p>
            <p>
                For the second pick of each "Pick #", the next "Pick #" should be aligned with the Tim's App's menu at the bottom of the app.  Example below.
                <img src={last_pick} />
            </p>
            <p>
                There is one exception.  Because the "Pick #3" doesn't have a 
                pick menu below it, this app will expect any screenshots that 
                don't have a "Pick #" near the game menu at the top to be 
                considered a "Pick #3" screenshot.  Instead, just align the 
                last players name with the bottom instead so that there are no 
                words between the bottom Tim's App Menu an the option for the 
                last "Pick #3" player option.  Example below.
                <img src={last_3rd_pick} />
            </p>
            <h3>Step 2 - Uploading the Screenshots</h3>
            <p>
                Click the "Choose Files" button and select all of the 
                screenshots for all 3 picks.
            </p>
            <h3>Step 3 - Scanning the Screenshots</h3>
            <p>
                Click the Barcode icon and the images will start to be 
                processed.  This will take a minute.  The length of time 
                depends on your device.  Once all of the images have been 
                processed, the picks will start to populate and automatically
                sort based on player goals.
            </p>
        </div>
    }
}

export default SkaterExtractorInfo;