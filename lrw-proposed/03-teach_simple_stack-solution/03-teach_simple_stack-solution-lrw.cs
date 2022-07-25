/********
CSE212 
(c) BYU-Idaho
03-Teach - Problem 1 - Solution

It is a violation of BYU-Idaho Honor Code to post or share this code with others or 
to post it online.Storage into a personal and private repository (e.g. private
GitHub repository, unshared Google Drive folder) is acceptable.

//--- Created from: dotnet new console. See https://aka.ms/new-console-template for more information ---//
********/
// using System.Collections.Generic;

/***************/
/*
void print_the_stack(Stack<int> toprint)
{
foreach(var i in toprint )
{Console.Write(i);
 }


}
/***************/
void PrintStack(Stack<int> toprint) {
    Console.Write("[");
    Console.Write($"{ string.Join(",", toprint)}");
    Console.WriteLine("]");
    }

void PrintStackAsArray(Stack<int> toprint) {
    Console.Write("[");
       // Converting the Stack into array
        int[] as_array = toprint.ToArray();
        // Displaying the elements in array
        int i=0;  // need to know the last element for pretty printing
        foreach(Object value in as_array)
        {
            Console.Write(value);
            if (i<as_array.Length) { Console.Write(", ");}
        }
    Console.WriteLine("]");
    }

Console.WriteLine("CSE212:03-Teach - Problem 1 - Solution");// Comment out this line



Stack<int> stack = new Stack<int>();
                    // Items shown here are how they are

stack.Push(1);		//[1]
stack.Push(2);		//[1, 2] 
stack.Push(3);		//[1, 2, 3]
stack.Pop();		//[1, 2] 
stack.Pop();		//[1]
stack.Push(4);		//[1, 4] 
stack.Push(5);		//[1, 4, 5]
stack.Pop();		//[1, 4]
stack.Push(6);		//[1, 4, 6]
stack.Push(7);		//[1, 4, 6, 7]
stack.Push(8);		//[1, 4, 6, 7, 8]
stack.Push(9);		//[1, 4, 6, 7, 8, 9]
stack.Pop();		//[1, 4, 6, 7, 8]
stack.Pop();		//[1, 4, 6, 7]
stack.Push(10);		//[1, 4, 6, 7, 10]
stack.Pop();		//[1, 4, 6, 7]
stack.Pop();		//[1, 4, 6]
stack.Pop();		//[1, 4]
stack.Push(11);		//[1, 4, 11]
stack.Push(12);		//[1, 4, 11, 12]
stack.Pop();		//[1, 4, 11]
stack.Pop();		//[1, 4]
stack.Pop();		//[1]
stack.Push(13);		//[1, 13]
stack.Push(14);		//[1, 13, 14]
stack.Push(15);		//[1, 13, 14, 15]
stack.Push(16);		//[1, 13, 14, 15, 16]
stack.Pop();		//[1, 13, 14, 15]
stack.Pop();		//[1, 13, 14]
stack.Pop();		//[1, 13]
stack.Push(17);		//[1, 13, 17]
stack.Push(18);		//[1, 13, 17, 18]
stack.Pop();		//[1, 13, 17]
stack.Push(19);		//[1, 13, 17, 19]
stack.Push(20);		//[1, 13, 17, 19, 20]
stack.Pop();		//[1, 13, 17, 19]
stack.Pop();		//[1, 13, 17]
	
Console.Write("Stacktype is:  ");// Comment out this line
PrintStack(stack);	//It will print [17,13,1]
// In a Stack() type, the 0th element is always the last one pushed on.  Here's proof, by printing as an array
Console.Write("Stack as array is:  ");// Comment out this line
PrintStackAsArray(stack);
