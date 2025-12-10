const toggleButton = document.getElementById("mode-btn");
const body = document.body;
const editors = []; // Store editor instances

// Initialize Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
        const codeBoxes = document.querySelectorAll('.code-box');

        codeBoxes.forEach((box) => {
                // Clear existing content
                box.innerHTML = '';

                // Create and insert Run button
                const runBtn = document.createElement('button');
                runBtn.className = 'run-btn';
                runBtn.innerHTML = 'Run &#9658;';
                box.appendChild(runBtn);

                // Determine context based on parent section ID
                const parentSection = box.closest('section');
                const sectionId = parentSection ? parentSection.id : '';
                const defaultCode = getDefaultCode(sectionId);

                const editor = monaco.editor.create(box, {
                        value: defaultCode,
                        language: 'python',
                        theme: body.classList.contains("dark-mode") ? 'vs-dark' : 'vs',
                        automaticLayout: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        padding: { top: 50, bottom: 16 }
                });

                editors.push(editor);
        });
});

function getDefaultCode(sectionId) {
        const codeMap = {
                // Intro
                'try-basic': `# Try It: Basic Syntax
print("Hello, Python!")
x = 5
y = 10
print(f"Sum: {x + y}")`,
                'try-versatility': `# Try It: Versatility
name = "Python"
print(name.upper())
numbers = [1, 2, 3, 4, 5]
print(f"Max number: {max(numbers)}")`,
                'try-hello': `# Try It: Hello World
print("Hello, World!")
print("Coding is fun!")`,

                // Syntax
                'try-basic-syntax': `# Try It: Basic Syntax Rules
# This is a comment
x = 10; y = 20  # Semicolons allow multiple statements (but not recommended)
print(x + y)`,
                'try-indentation': `# Try It: Indentation
if True:
    print("This is indented")
    print("So is this")
print("This is outside the block")`,
                'try-print': `# Try It: Print Function
print("Hello", "World", sep="-")
print("Loading", end="...")
print("Done!")`,
                'try-input-output': `# Try It: Input and Output
# Note: Input might not work fully in this static demo
name = "User" # input("Enter your name: ")
print(f"Hello, {name}!")`,

                // Datatypes
                'try-variables': `# Try It: Variables
name = "Alice"
age = 25
height = 5.6
is_student = True
print(f"{name} is {age} years old.")`,
                'try-numeric': `# Try It: Numeric Types
x = 10      # int
y = 3.14    # float
z = 1 + 2j  # complex
print(type(x), type(y), type(z))
print(x + y)`,
                'try-collections': `# Try It: Collections
my_list = [1, 2, 3]
my_dict = {"a": 1, "b": 2}
my_set = {1, 2, 3}
print(my_list, my_dict, my_set)`,
                'try-conversion': `# Try It: Type Conversion
s = "123"
n = int(s)
f = float(s)
print(n + 10)
print(f + 0.5)`,

                // Typecasting
                'try-conversions': `# Try It: Implicit vs Explicit
x = 10      # int
y = 2.5     # float
result = x + y  # Implicit to float
print(f"Result: {result}, Type: {type(result)}")

s = "100"
print(int(s) + 50)  # Explicit string to int`,
                'try-functions': `# Try It: Conversion Functions
print(int(3.99))      # Truncates to 3
print(str(123) + "456") # Concatenates strings
print(bool(0), bool(1)) # False, True`,
                'try-errors': `# Try It: Error Handling
try:
    number = int("abc")
except ValueError:
    print("Cannot convert 'abc' to integer!")`,
                'try-practical': `# Try It: Practical Typecasting
price_str = "19.99"
quantity_str = "5"
total = float(price_str) * int(quantity_str)
print(f"Total: \${total}")`,

                // Operators
                'try-arithmetic': `# Try It: Arithmetic
a = 10
b = 3
print(f"Addition: {a + b}")
print(f"Division: {a / b}")
print(f"Floor Div: {a // b}")
print(f"Modulus: {a % b}")
print(f"Power: {a ** b}")`,
                'try-comparison': `# Try It: Comparison
x = 5
y = 10
print(x == y)
print(x < y)
print(x != y)`,
                'try-logical-assignment': `# Try It: Logical & Assignment
x = True
y = False
print(x and y)
print(x or y)
print(not x)

a = 5
a += 3
print(a)`,
                'try-advanced': `# Try It: Advanced Operators
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a is b)      # True
print(a is c)      # False
print(1 in a)      # True
print(5 & 3)       # Bitwise AND`,
                'try-precedence': `# Try It: Precedence
result = 5 + 3 * 2
print(result)      # 11
result = (5 + 3) * 2
print(result)      # 16`,

                // Conditional Statements
                'try-if': `# Try It: If Statement
age = 20
if age >= 18:
    print("You are an adult.")`,
                'try-elif': `# Try It: If-Elif-Else
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Grade: C or lower")`,
                'try-complex': `# Try It: Complex Conditions
age = 25
income = 50000
has_debt = False
if (age > 18 and income > 30000) and not has_debt:
    print("Loan Approved")`,
                'try-ternary': `# Try It: Ternary Operator
age = 17
status = "Adult" if age >= 18 else "Minor"
print(status)`,

                // Loops
                'try-for': `# Try It: For Loop
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")`,
                'try-range': `# Try It: Range
for i in range(1, 6):
    print(i * i)`,
                'try-while': `# Try It: While Loop
count = 5
while count > 0:
    print(count)
    count -= 1
print("Blastoff!")`,
                'try-advanced': `# Try It: Nested Loops
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i}x{j}={i*j}", end=" ")
    print()`,
                'try-comprehensive': `# Try It: Enumerate and Zip
names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age}")`,

                // Jumping Statements
                'try-break': `# Try It: Break
for i in range(10):
    if i == 5:
        break
    print(i)`,
                'try-continue': `# Try It: Continue
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)`,
                'try-pass': `# Try It: Pass
def incomplete_function():
    pass  # TODO: Implement later

incomplete_function()
print("Function called successfully")`,
                'try-return': `# Try It: Return
def add(a, b):
    return a + b

print(add(5, 3))`,

                // Functions
                'try-basic': `# Try It: Basic Function
def greet():
    print("Hello from a function!")

greet()`,
                'try-parameters': `# Try It: Parameters
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")
greet("Bob", "Hi")`,
                'try-scope': `# Try It: Scope
x = 10  # Global

def my_func():
    x = 5  # Local
    print(f"Inside: {x}")

my_func()
print(f"Outside: {x}")`,
                'try-lambda': `# Try It: Lambda
square = lambda x: x ** 2
print(square(5))

numbers = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)`,
                'try-complete': `# Try It: Complete Function
def calculate_area(length, width):
    """Calculate area of a rectangle."""
    return length * width

print(f"Area: {calculate_area(10, 5)}")`,

                // Lists
                'try-create': `# Try It: Create Lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
print(numbers)
print(mixed)`,
                'try-access': `# Try It: Indexing & Slicing
fruits = ["apple", "banana", "cherry", "date"]
print(fruits[0])      # First
print(fruits[-1])     # Last
print(fruits[1:3])    # Slice`,
                'try-methods': `# Try It: List Methods
fruits = ["apple", "banana"]
fruits.append("cherry")
fruits.insert(1, "blueberry")
print(fruits)
fruits.sort()
print(fruits)`,
                'try-comprehensions': `# Try It: List Comprehensions
squares = [x**2 for x in range(10)]
print(squares)
evens = [x for x in range(10) if x % 2 == 0]
print(evens)`,
                'try-advanced': `# Try It: Nested Lists
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print(matrix[1][1])  # Center element`,

                // Dictionaries, Sets, Tuples
                'try-dict-basic': `# Try It: Dictionaries
person = {"name": "Alice", "age": 30}
print(person["name"])
person["city"] = "New York"
print(person)`,
                'try-dict-methods': `# Try It: Dict Methods
person = {"name": "Alice", "age": 30}
for key, value in person.items():
    print(f"{key}: {value}")`,
                'try-sets': `# Try It: Sets
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a.union(b))
print(a.intersection(b))`,
                'try-tuples': `# Try It: Tuples
coords = (10, 20)
x, y = coords
print(f"X: {x}, Y: {y}")
# coords[0] = 5  # This would raise an error`,
                'try-all': `# Try It: Combined Data Structures
users = [
    {"id": 1, "name": "Alice", "roles": {"admin", "editor"}},
    {"id": 2, "name": "Bob", "roles": {"viewer"}}
]
print(users[0]["roles"])`,

                // Strings
                'try-basics': `# Try It: String Basics
text = "Python Programming"
print(text[0])
print(text[-1])
print(text[::-1])  # Reverse`,
                'try-methods': `# Try It: String Methods
text = "  Hello World  "
print(text.strip().upper())
print(text.replace("World", "Python"))`,
                'try-formatting': `# Try It: Formatting
name = "Alice"
score = 95.5
print(f"Player {name} scored {score:.1f}")`,
                'try-operations': `# Try It: String Ops
print("Na" * 8 + " Batman!")
print("Python" in "I love Python")`,
                'try-practical': `# Try It: Practical String
email = "user@example.com"
username = email.split("@")[0]
print(f"Username: {username}")`,

                // Recursion
                'try-basic': `# Try It: Basic Recursion
def countdown(n):
    if n <= 0:
        print("Blastoff!")
    else:
        print(n)
        countdown(n - 1)

countdown(5)`,
                'try-classic': `# Try It: Factorial
def factorial(n):
    if n <= 1: return 1
    return n * factorial(n - 1)

print(factorial(5))`,
                'try-advanced': `# Try It: Fibonacci
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

print([fib(i) for i in range(10)])`,
                'try-debug': `# Try It: Debugging
# Fixed base case
def sum_list(lst):
    if not lst:
        return 0
    return lst[0] + sum_list(lst[1:])

print(sum_list([1, 2, 3, 4, 5]))`,
                'try-practice': `# Try It: Reverse String
def reverse_str(s):
    if len(s) == 0:
        return s
    return reverse_str(s[1:]) + s[0]

print(reverse_str("recursion"))`
        };

        return codeMap[sectionId] || "# Write your Python code here\\nprint('Hello, Python!')";
}

function toggleTheme() {
        // Check if the body has the 'dark-mode' class
        if (body.classList.contains("dark-mode")) {
                // If it does, remove it (switch to light mode)
                body.classList.remove("dark-mode");
                toggleButton.innerText = "Dark Mode";
                setEditorTheme('vs');
        } else {
                // If it doesn't, add it (switch to dark mode)
                body.classList.add("dark-mode");
                toggleButton.innerText = "Light Mode";
                setEditorTheme('vs-dark');
        }
}

function setEditorTheme(theme) {
        if (typeof monaco !== 'undefined') {
                monaco.editor.setTheme(theme);
        }
}

toggleButton.addEventListener("click", toggleTheme);