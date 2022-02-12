import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  //Create Elements
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div"); 
  const img = document.createElement("img");
  const name = document.createElement("span");

  // Add all classes
  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  // Add all content
  headline.textContent = article.headline
  img.src = article.authorPhoto
  name.textContent = article.authorName

  // Append everything
  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  author.appendChild(name);
  imgContainer.appendChild(img);

  // Add functionality
  card.addEventListener("click", function() {
    console.log(headline);
  })

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get(`http://localhost:5000/api/articles`)
  .then(resp => {
    const articles = resp.data.articles
    articles.bootstrap.forEach(element => {
        const bootArt = Card(element);
        document.querySelector(selector).appendChild(bootArt);
    });

    articles.javascript.forEach(element => {
      const javaArt = Card(element);
      document.querySelector(selector).appendChild(javaArt)
    })

    articles.jquery.forEach(element => {
      const jayArt = Card(element);
      document.querySelector(selector).appendChild(jayArt)
    })

    articles.node.forEach(element => {
      const nodeArt = Card(element);
      document.querySelector(selector).appendChild(nodeArt)
    })

    articles.technology.forEach(element => {
      const techArt = Card(element);
      document.querySelector(selector).appendChild(techArt)
    })
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => console.log("DONE"))
  }

export { Card, cardAppender }
