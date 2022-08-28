/**
 * CSE212 
 * (c) BYU-Idaho
 * 01-Teach - Problem 1
 * 
 * It is a violation of BYU-Idaho Honor Code to post or share this code with others or 
 * to post it online.  Storage into a personal and private repository (e.g. private
 * GitHub repository, unshared Google Drive folder) is acceptable.
 */
public class Divisors {

    /// <summary>
    /// Create a list of all divisors for a number including 1
    /// and excluding the number itself.  Modulo will be used
    /// to test divisibility.
    /// </summary>
    /// <param name="number">The number to find the divisor</param>
    /// <returns>fixed array of divisors</returns>

    private int[] FindDivisorsFixedArray(int number) {
        int[] tempResults = new int[number];
        int insertIndex = 0;
        for (int i = 1; i < number; ++i) {
            if (number % i == 0) {
                tempResults[insertIndex] = i;
                insertIndex += 1;
            }
        }
        int[] results = new int[insertIndex];
        Array.Copy(tempResults, results, insertIndex);
        return results;
    }

    /// <summary>
    /// Same as FindDivisorsFixedArray but a List is returned instead.
    /// </summary>
    /// <param name="number">The number to find the divisor</param>
    /// <returns>List of divisors</returns>

    private List<int> FindDivisorsDynamicArray(int number) {
        List<int> results = new List<int>();
        for (int i = 1; i < number; ++i) {
            if (number % i == 0) {
                results.Add(i);
            }
        }
        return results;

    }

    /// <summary>
    /// Entry point for the Divisors class
    /// </summary>
    public void run() {
        print(FindDivisorsFixedArray(80)); // [1, 2, 4, 5, 8, 10, 16, 20, 40]
        print(FindDivisorsDynamicArray(80)); // <List>[1, 2, 4, 5, 8, 10, 16, 20, 40]
        print(FindDivisorsFixedArray(79)); // [1] ... This is prime
        print(FindDivisorsDynamicArray(79)); // <List>[1]
    }

    private void print(List<int> list) {
        Console.WriteLine("<List>[" + String.Join(", ", list) + "]");
    }

    private void print(int[] list) {
        Console.WriteLine("[" + String.Join(", ", list) + "]");
    }
}