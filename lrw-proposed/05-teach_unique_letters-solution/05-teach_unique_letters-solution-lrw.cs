/********
CSE212 
(c) BYU-Idaho
05-Teach - Problem 1 - Solution

It is a violation of BYU-Idaho Honor Code to post or share this code with others or 
to post it online.  Storage into a personal and private repository (e.g. private
GitHub repository, unshared Google Drive folder) is acceptable.

//--- Created from: dotnet new console. See https://aka.ms/new-console-template for more information ---//
********/
Console.WriteLine("CSE212:  05-Teach - Problem 1 - Solution");  // Comment out this line

string test0 = "abcdefghijklmnopqrstuvwxyZ";
string test1 = "abcdefghijklanopqrstuvwxyz";
string test2 = "";
List<string> test_strings = new List<string>();

// put the test strings in an associative array for fun
// Key goes first
Dictionary<string, string> test_dict = new Dictionary<string, string>();


test_strings.Add(test0);
test_strings.Add(test1);
test_strings.Add(test2);
PrintArray(test_strings);



    //     Determine if there are any duplicate letters in the text provided.
    //     This solution should use a set and result in O(n) performance.

foreach (string test in test_strings)
    {
    Console.WriteLine("Duplicate letters in test: " + duplicate_letters(test));  // Comment out this line
    }

// Console.WriteLine("Duplicate letters in test1: " + duplicate_letters(test1));  // Comment out this line
// Console.WriteLine("Duplicate letters in test2" + duplicate_letters(test2));  // Comment out this line
// Console.WriteLine("Duplicate letters in test3" + duplicate_letters(test3));  // Comment out this line


bool duplicate_letters(string textin)
    {
    bool found = false;
    Console.WriteLine("length in is: " + textin.Length);
    for(int i=0;i<textin.Length;i++) {
        // Console.WriteLine("doing: " + i + textin[i]);
        found = found ^ ((textin.Substring(i+1).IndexOf(textin[i])) > i);
        if (found) {break;}
        }
    return found;
    }

void PrintArray(List<string> toprint){
    int i = 1;
    Console.WriteLine("Got to Print Array");
    Console.Write("[");
    foreach (var item in toprint) {
        Console.Write(item);i++;
        if (i<toprint.Count) {Console.Write(", ");} else {Console.WriteLine(" ]");}
        }
    }

// An alternative solution:
//  
//     Determine if there are any duplicate letters in the text provided.
//     This solution should use a set and result in O(n) performance.
    /* 
    var unique = new HashSet<object>();
    foreach (var letter in text) {
        unique.add(letter);
    }
    // The above three lines can be simplified to just: unique = set(text)
    // If the text has only unique letters, then the unique set should
    // be the same size of the text string.
    return unique.Count == text.Count;
    // We could simplify this function to a single line:
    // return len(set(text)) == len(text)
    */
