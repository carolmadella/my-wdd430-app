/********
CSE212 
(c) BYU-Idaho
04-Teach - Problem 1 - Solution

It is a violation of BYU-Idaho Honor Code to post or share this code with others or 
to post it online.  Storage into a personal and private repository (e.g. private
GitHub repository, unshared Google Drive folder) is acceptable.

//--- Created from: dotnet new console. See https://aka.ms/new-console-template for more information ---//
********/
using System.Collections.Generic;
using System.Collections;
Console.WriteLine("CSE212:  04-Teach - Problem 1 - Solution");  // Comment out this line
object value;   // let anything be stored as the Queue element

Queue theQueue = new Queue();



/********** Test Cases  **************/
// Test 1
// Scenario: Enqueue one value and then Dequeue it.
// Exepcted Result: It should display 100
Console.WriteLine("Test 1");
theQueue.Clear();
theQueue.Enqueue(100);
value = theQueue.Dequeue();
Console.WriteLine(value);
// Defect(s) Found:
Console.WriteLine("=================");

// Test 2
// Scenario: Enqueue multiple values and then Dequeue all of them
// Exepcted Result: It should display 200, then 300, then 400 in that order
Console.WriteLine("Test 2");
theQueue.Clear();
theQueue.Enqueue(200);
theQueue.Enqueue(300);
theQueue.Enqueue(400);
value = theQueue.Dequeue();
Console.WriteLine(value);
value = theQueue.Dequeue();
Console.WriteLine(value);
value = theQueue.Dequeue();
Console.WriteLine(value);
// Defect(s) Found: 
Console.WriteLine("=================");

// Test 3
// Scenario: Dequeue from an empty Queue
// Exepcted Result: An exception should be raised
Console.WriteLine("Test 3");
theQueue.Clear();
try {
    theQueue.Dequeue();
    Console.WriteLine("Oops ... This shouldn't have worked.");
    }
catch (Exception ex) {
    // Defect(s) Found: 
    Console.WriteLine("I got the exception as expected.");
    Console.WriteLine("Exception was: " + ex);
    }
Console.WriteLine("========END of tests for built-in Queue type =========");

/*******************  Now with the local class-built queue *********************/
Console.WriteLine("Test 4");
var listQueue = new Handmade_Queue();   // Question for this lab -- are we teaching classes or data structures?  
listQueue.Enqueue(100);

value = listQueue.Dequeue();
Console.WriteLine(value);
Console.WriteLine("========END of tests for list class Queue type =========");

public class Handmade_Queue {
    public List<object> QueueFromList = new List<object>();
    // Hand make a Queue as a list of objects
    //         
    public void Enqueue(object valuein) {
        // Insert at the front end
        QueueFromList.Insert(0,valuein);
        }
    // 
    public object Dequeue() {
        // take off the back end and return it
        object valueout ;
        int theLast = QueueFromList.Count - 1;
        valueout = QueueFromList[theLast];
        QueueFromList.RemoveAt(theLast);  // Discard the last element
        return(valueout);
        }
    }