//Get Quote from the API
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

function showLoadingSpinner()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner()
{
    if(!loader.hidden)
    {
    loader.hidden=true;
    quoteContainer.hidden=false;
    }
}

//Get the quote
async function getQuote()
{
    showLoadingSpinner();
const proxyUrl='https://cors-anywhere.herokuapp.com/'
const apiUrl='https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
try
{
    const response=await fetch(proxyUrl + apiUrl);
    const data=await response.json();
    if(data.quoteAuthor==='')
    {
        authorText.innerText='Unknown';
    }
    else{
    console.log(data);
    authorText.innerText=data.quoteAuthor;
    }
    if(data.quoteText.lenget>120)
    {
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText=data.quoteText;
    removeLoadingSpinner();
}catch(error)
{
    getQuote();
    console.log('OOps ');
}
}

//Tweet Quote
function tweetQuote()
{
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// On load
getQuote();
