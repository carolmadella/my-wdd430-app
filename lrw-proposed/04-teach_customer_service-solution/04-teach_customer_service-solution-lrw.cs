/********
CSE212 
(c) BYU-Idaho
04-Teach - Problem 2 - Solution

It is a violation of BYU-Idaho Honor Code to post or share this code with others or 
to post it online.  Storage into a personal and private repository (e.g. private
GitHub repository, unshared Google Drive folder) is acceptable.

//--- Created from: dotnet new console. See https://aka.ms/new-console-template for more information ---//
********/
Console.WriteLine("CSE212:  04-Teach - Problem 2 - Solution");  // Comment out this line

customerService myServiceQueue = new customerService();

/***   TESTING ***/
Console.WriteLine("-----------Begin Test 2-----------\n");
myServiceQueue.add_new_customer();
myServiceQueue.add_new_customer();
// Console.WriteLine("Before serving customers: ",service);
myServiceQueue.serve_customer();
myServiceQueue.serve_customer();
myServiceQueue.serve_customer();
myServiceQueue.serve_customer();
//Console.WriteLine("After serving customers: ",service);
Console.WriteLine("------------End Test 2-----------\n");




class customerService{
    public customerServiceQueue customers_to_serve = new customerServiceQueue();
    int customer_number = 1;  // should be unique and ever-increasing
    
    public void add_new_customer(){
        Customer new_one = new Customer(true);
        new_one.accountID = customer_number++;
        customers_to_serve.EnQueue(new_one);
        }

    public void serve_customer(){
        /* For now, this just prints the name of the customer and takes him off the queue */
        if (customers_to_serve.empty()) {
            Console.WriteLine("No more customers left to serve");
        } else {
            Customer to_serve = customers_to_serve.DeQueue();
            Console.WriteLine("Customer[#" + to_serve.accountID + "]:\t Name:" + to_serve.name + "\tProblem: " + to_serve.problem);
            }
    }

    public class Customer {
        public int accountID; 
        public string name = "";
        public string problem = "";
        public Customer(bool ask_for_new) {
            if (ask_for_new) {
                Console.Write("Enter the Customer name --> ");
                name = name + Console.ReadLine();
                Console.Write("Enter the Problem --> ");
                problem = problem + Console.ReadLine();
            }
            }

        }
    
    public class customerServiceQueue {
        public List<Customer> theQueue = new List<Customer>();
        // 

        public void EnQueue(Customer to_add) {
            //         Add an item to the queue
            // Console.WriteLine("Node_to_add priority:  " + node_to_add.priority);
            // Console.WriteLine("Enqueueing:  " + node_to_add.ToString());
            theQueue.Add(to_add);
            }
        public Customer DeQueue() {
            Customer empty = new Customer(false);  /* True means ask for a new one, else empty one */
            if (theQueue.Count == 0) {
                Console.WriteLine("Queue EMPTY");
                return empty;
                }
            Customer toreturn = theQueue[0];
            // Remove the next item from the queue. 
            theQueue.RemoveAt(0);
            return toreturn;
            }
        public bool is_empty() {
            return (theQueue.Count == 0);
            }
        public void printWholeQueue(){
            Console.WriteLine("\t\tQueue Count is:  " +theQueue.Count);
            for(int i=0;i<theQueue.Count; i++) {
                Console.WriteLine("\t\t[" + i + "]\t" + theQueue[i].name + "\t ID:\t" + theQueue[i].accountID);
                }
            }
        public int Count() {
            return theQueue.Count;
            }
        public bool empty() {
            return (theQueue.Count==0);
        }

    }

    }