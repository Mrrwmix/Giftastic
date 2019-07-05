**Deployed website: https://mrrwmix.github.io/Giftastic/

**Description of the Problem

Make a website that searches the Giphy API and displays gifs as still images until clicked. Allow users to favorite gifs. Allow users to remove favorites. 

**How I Solved It

To allow on click events for dynamically created elements, I had to use jQuery's $("body").on("click",<target>,function(){}) syntax.
  
Favoriting and unfavoriting gifs involved JSON parsing and stringifying an array. Favorited gif URLs were pushed to an array and put in localStorage. To unfavorite, the gif's URLs are removed from the favorites array. 

**Technical approach

Used Bootstrap to make the website mobile responsive. Created a shell first, then worked on the implementation of the Giphy API. jQuery's aforementioned syntax solved a lot of problems I was having. Lastly, challenged myself by incorporating localStorage.
