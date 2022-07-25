/********
CSE212 
(c) BYU-Idaho
01-Teach - Problem 1 - Solution

It is a violation of BYU-Idaho Honor Code to post or share this code with others or 
to post it online.  Storage into a personal and private repository (e.g. private
GitHub repository, unshared Google Drive folder) is acceptable.

//--- Created from: dotnet new console. See https://aka.ms/new-console-template for more information ---//
********/
Console.WriteLine("CSE212:  01-Teach - Problem 1 - Solution");  // Comment out this line

/* 
def find_divisors(number):
    /*
    Create a list of all divisors for a number including 1
    and excluding the number itself.  Modulo will be used
    to test divisibility.
    Test all numbers from 1 to number-1.

    Actually, we can be could efficient with range(1, (number//2)+1)
    Not shown here.
    */

/* Note that the List type is used because we don't know in advance, the number of 
   Divisors to be in the array  */

// ******************************** //
List<int> find_divisors(int number) {
// ******************************** //
    List<int> find_them = new List<int>();
    int found = 0;
    for(int divisor=1;(divisor<number);divisor++) {
        if ((number % divisor) == 0) {
            find_them.Add(divisor); found++;
            }
        }
    return find_them;
    }


// ******************************** //
 void PrintArray(List<int> toprint) {
// ******************************** //
        Console.Write("[");
        for(int i=0;i<toprint.Count;i++)
            {
                if (i==(toprint.Count-1))
                    {Console.WriteLine(toprint[i] + "]");}
                else {Console.Write(toprint[i] + ", ");}
            }
        }


// *********** EXECUTION START HERE ********************* //
List<int> answer1 = find_divisors(80);                            // Answer should be: [1, 2, 4, 5, 8, 10, 16, 20, 40]
Console.Write("Divisors of 80: "); PrintArray(answer1);
Console.Write("Divisors of 79: "); PrintArray(find_divisors(79)); // Answer should be: [1]    This is a prime number
