console.log(`this is working`);
// MTA Lab

// Objectives:

// Apply your knowledge of Javascript to solve a real world problem.
// Get really good at array manipulation and JS data structures.
// Activity

// Create a program that models a simple subway system.

// The program takes the line and stop that a user is getting on at and the line and stop that user is getting off at and prints the journey and the total number of stops for the trip in the console:

// planTrip('N', 'Times Square', '6', '33rd'); // This is only a suggested function name and signature.

// // console.log() shows output similar to this:
// // "You must travel through the following stops on the N line: 34th, 28th, 23rd, Union Square."
// // "Change at Union Square."
// // "Your journey continues through the following stops: 23rd, 28th, 33rd."
// // "7 stops in total."
// There are 3 subway lines:
// The N line has the following stops: Times Square, 34th, 28th, 23rd, Union Square, and 8th
// The L line has the following stops: 8th, 6th, Union Square, 3rd, and 1st
// The 6 line has the following stops: Grand Central, 33rd, 28th, 23rd, Union Square, and Astor Place.
// All 3 subway lines intersect at Union Square, but there are no other intersection points. (For example, this means the 28th stop on the N line is different than the 28th street stop on the 6 line, so you might need to differentiate this when you name your stops in the arrays.)
// Tell the user the number of stops AND the stops IN ORDER that they will pass through or change at.
// Your trip planner must work in either direction, i.e. planTrip('N', 'Times Square', '6', '33rd') (starting at Times Square) should work as well as the reverse trip planTrip('6', '33rd', 'N', 'Times Square') (starting at 33rd).
// Hints:

// Work out how you would do it on paper first! Then start to explain that process in Javascript.
// 👉 Get the program to work for a single line (in any direction) before trying to tackle multiple lines. 👈
// Don't worry about prompting the user for input. Hard code some test-run calls to the tip planning function to make it fast to test your code.
// Why not try using the browser's DEBUGGER to debug your broken solution?
// Consider diagramming the lines by sketching out the subway lines and their stops and intersection.
// The key to the lab is finding the index positions of each stop. (hint: indexOf())
// Depending on what kind of data structures you use to represent the lines and stations, you might have to make sure the stops that are the same for different lines have different names (i.e. 23rd on the N and on the 6 need to be differentiated)



// -----------------------------------------------------------

// trying it out using slice()

const lines = {
    N : ['Times Square', '34th', '28th', '23rd', 'Union Square'],
    L : ['8th', '6th', 'Union Square', '3rd','1st'],
    6 : ['Grand Central', '33rd', '28th', '23rd', 'Union Square', 'Astor Place']

}




const planTrip = function (startLine, startStation, endLine, endStation ) {
    // create an empty array for the stops we're passing by
    let stationsPassedBy = [];
    // create a count (starts at zero) for the number of stations we pass by
    let numberOfStationsPassed = 0;

    // loop through the start line and push each stop into the array and increment count

    const startingLine = lines[startLine];
    const endingLine = lines[endLine];

    // this returns true or false
    const sameLine = startLine === endLine;

    // create an if statemennt above Union square > ++ 





    for(let i = startingLine.indexOf(startStation); i < startingLine.length; i++) {
        stationsPassedBy.push(startingLine[i]);
        numberOfStationsPassed++;
        // if endStation then stop /return
        if(sameLine && startingLine[i] === endStation) {
            return {stations: stationsPassedBy, stationsCount: numberOfStationsPassed }
        }
        // if endStation on different line, change line at union square
        if(!sameLine && startingLine[i] === 'Union Square') {
            for (let j = endingLine.indexOf('Union Square'); j < endingLine.length; j++){
                stationsPassedBy.push(endingLine[j]);
                numberOfStationsPassed++;

                //if we reach endStation, then stop / return
                if (endingLine[j] === endStation){
                    return {stations: stationsPassedBy, stationsCount: numberOfStationsPassed }
                }
            }
        }
    }
}

// exmaple with stations on the same line
console.log(planTrip('N', 'Times Square', 'L', '1st'));

// To stop union square coming up twice
// maybe to stop the start station being counted
// to look into going bachwards with arrays (something like i-- instead of i++)