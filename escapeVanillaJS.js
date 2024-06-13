document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("solveRoom1").addEventListener("click", () => { //ammended the ID to solveRoom1
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`; //changed the id to room1Result 
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'promises', 'async', 'await', 'callbacks']);// Added more javascript concepts 
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        const commonConcepts = findIntersection(jsConcepts, reactConcepts); // added reactConcepts to rectify the function call
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json') 
            .then(response => response.json())
            .then(directions => {
                return navigateLabyrinth(directions) //Added return 
                    .then(message => {
                        document.getElementById("room3Result").textContent = message; //.textContent isntead .innerHtml
                    });
            });
    });
});

function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent); //changed the comparison in the reduce method to greater than ">" instead of less than. 
}

function findIntersection(setA, setB) {
    const intersection = new Set([...setA].filter(item=> setB.has(item))); //used the filter method to check if a elements in SetA exist in Set B using the has method. 
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000)); //used the await operator to delay the message
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

