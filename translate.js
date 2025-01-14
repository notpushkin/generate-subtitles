const fetch = require('node-fetch');
const l = console.log;

const LTEndpoint = 'http://76.50.42.128:49627/translate';

process.on('unhandledRejection', (reason, promise) => {
  l(reason);
  l(promise);
});

async function hitLTBackend({ text, sourceLanguage, targetLanguage }){
  const res = await fetch(LTEndpoint, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: sourceLanguage,
      target: targetLanguage
    }),
    headers: { "Content-Type": "application/json" }
  });

  return await res.json()
}

async function translateText({ text, sourceLanguage, targetLanguage }){
  const translatedResponse = await hitLTBackend({ text, sourceLanguage, targetLanguage });
  const { detectedLanguage, translatedText } = translatedResponse;
  return translatedText;
  // l(translatedResponse);
}

/** all languages should be as abbreviation **/

// translate from this language
const sourceLanguage = 'auto';

// into this language
const targetLanguage = 'es';

const text = 'This is the text I want to translate';

// translate({ text, sourceLanguage, targetLanguage });

async function main(){
  const translatedText = await translateText({ text, sourceLanguage, targetLanguage });
  l('translatedText');
  l(translatedText);
}

// main();

module.exports = translateText;
