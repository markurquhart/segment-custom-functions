<h2>Sample Custom Source Function for Qualtrics testing</h2>
<p>Basic custom source function that listens for incoming survey response, and places data/answers into a Track call for Segment.</p>
<p><b>Please note: </b>This function is for testing purposes only is not meant for production use without further development.</p>

<h3>Setting this up/h3>
<p>The handler.js file is meant to catch the payload (form values) delivered by a Qualtrics webhook upon succesful submission of a form. You will need to go into Qualtrics and set that up in order to use this function. When you are building the webhook in Qualtrics, note that you'll need to use the Function URL from Segment first, test, and then when ready publish the Segment Function to a Source, and replace the webhook URL in Qualtrics with that new Source specific function</p>




