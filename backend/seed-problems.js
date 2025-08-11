const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sampleProblems = [
  {
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to target.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Constraints:
- 2 ≤ nums.length ≤ 10⁴
- -10⁹ ≤ nums[i] ≤ 10⁹
- -10⁹ ≤ target ≤ 10⁹
- Only one valid answer exists.`,
    difficulty: 'EASY',
    timeLimit: 15,
    memoryLimit: 128,
    tags: ['array', 'hash-table'],
    category: 'algorithms',
    constraints: '2 ≤ nums.length ≤ 10⁴, -10⁹ ≤ nums[i] ≤ 10⁹, -10⁹ ≤ target ≤ 10⁹',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
      }
    ],
    testCases: [
      { input: '[2,7,11,15]\n9', output: '[0,1]', isHidden: false, weight: 1 },
      { input: '[3,2,4]\n6', output: '[1,2]', isHidden: false, weight: 1 },
      { input: '[3,3]\n6', output: '[0,1]', isHidden: false, weight: 1 },
      { input: '[1,2,3,4,5]\n8', output: '[2,4]', isHidden: true, weight: 1 },
      { input: '[-1,-2,-3,-4,-5]\n-8', output: '[2,4]', isHidden: true, weight: 1 }
    ]
  },
  {
    title: "Reverse Integer",
    description: `Given a signed 32-bit integer \`x\`, return \`x\` with its digits reversed. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2³¹, 2³¹ - 1]\`, then return \`0\`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

## Constraints:
- -2³¹ ≤ x ≤ 2³¹ - 1`,
    difficulty: 'MEDIUM',
    timeLimit: 20,
    memoryLimit: 128,
    tags: ['math'],
    category: 'algorithms',
    constraints: '-2³¹ ≤ x ≤ 2³¹ - 1',
    examples: [
      {
        input: 'x = 123',
        output: '321',
        explanation: null
      },
      {
        input: 'x = -123',
        output: '-321',
        explanation: null
      },
      {
        input: 'x = 120',
        output: '21',
        explanation: null
      }
    ],
    testCases: [
      { input: '123', output: '321', isHidden: false, weight: 1 },
      { input: '-123', output: '-321', isHidden: false, weight: 1 },
      { input: '120', output: '21', isHidden: false, weight: 1 },
      { input: '0', output: '0', isHidden: true, weight: 1 },
      { input: '1534236469', output: '0', isHidden: true, weight: 2 }
    ]
  },
  {
    title: "Valid Parentheses",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Constraints:
- 1 ≤ s.length ≤ 10⁴
- s consists of parentheses only '()[]{}'.`,
    difficulty: 'EASY',
    timeLimit: 10,
    memoryLimit: 64,
    tags: ['string', 'stack'],
    category: 'algorithms',
    constraints: '1 ≤ s.length ≤ 10⁴, s consists of parentheses only \'()[]{}\'.  ',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
        explanation: null
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
        explanation: null
      },
      {
        input: 's = "(]"',
        output: 'false',
        explanation: null
      }
    ],
    testCases: [
      { input: '()', output: 'true', isHidden: false, weight: 1 },
      { input: '()[{}]', output: 'true', isHidden: false, weight: 1 },
      { input: '(]', output: 'false', isHidden: false, weight: 1 },
      { input: '([)]', output: 'false', isHidden: true, weight: 1 },
      { input: '{[]}', output: 'true', isHidden: true, weight: 1 }
    ]
  },
  {
    title: "Longest Common Subsequence",
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

- For example, \`"ace"\` is a subsequence of \`"abcde"\`.

A **common subsequence** of two strings is a subsequence that is common to both strings.

## Constraints:
- 1 ≤ text1.length, text2.length ≤ 1000
- text1 and text2 consist of only lowercase English characters.`,
    difficulty: 'MEDIUM',
    timeLimit: 30,
    memoryLimit: 256,
    tags: ['string', 'dynamic-programming'],
    category: 'algorithms',
    constraints: '1 ≤ text1.length, text2.length ≤ 1000, text1 and text2 consist of only lowercase English characters.',
    examples: [
      {
        input: 'text1 = "abcde", text2 = "ace"',
        output: '3',
        explanation: 'The longest common subsequence is "ace" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "abc"',
        output: '3',
        explanation: 'The longest common subsequence is "abc" and its length is 3.'
      },
      {
        input: 'text1 = "abc", text2 = "def"',
        output: '0',
        explanation: 'There is no such common subsequence, so the result is 0.'
      }
    ],
    testCases: [
      { input: 'abcde\nace', output: '3', isHidden: false, weight: 1 },
      { input: 'abc\nabc', output: '3', isHidden: false, weight: 1 },
      { input: 'abc\ndef', output: '0', isHidden: false, weight: 1 },
      { input: 'pmjghexybyrgzczy\nhefzg', output: '2', isHidden: true, weight: 2 },
      { input: 'bsbininm\njmjkbkjkv', output: '1', isHidden: true, weight: 2 }
    ]
  },
  {
    title: "Binary Tree Maximum Path Sum",
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the **maximum path sum** of any **non-empty** path.

## Constraints:
- The number of nodes in the tree is in the range [1, 3 * 10⁴].
- -1000 ≤ Node.val ≤ 1000`,
    difficulty: 'HARD',
    timeLimit: 45,
    memoryLimit: 512,
    tags: ['binary-tree', 'depth-first-search', 'dynamic-programming', 'tree'],
    category: 'algorithms',
    constraints: 'The number of nodes in the tree is in the range [1, 3 * 10⁴], -1000 ≤ Node.val ≤ 1000',
    examples: [
      {
        input: 'root = [1,2,3]',
        output: '6',
        explanation: 'The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.'
      },
      {
        input: 'root = [-10,9,20,null,null,15,7]',
        output: '42',
        explanation: 'The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.'
      }
    ],
    testCases: [
      { input: '[1,2,3]', output: '6', isHidden: false, weight: 1 },
      { input: '[-10,9,20,null,null,15,7]', output: '42', isHidden: false, weight: 1 },
      { input: '[-3]', output: '-3', isHidden: true, weight: 1 },
      { input: '[5,4,8,11,null,13,4,7,2,null,null,null,1]', output: '48', isHidden: true, weight: 2 },
      { input: '[1,-2,-3,1,3,-2,null,-1]', output: '3', isHidden: true, weight: 2 }
    ]
  }
];

async function seedProblems() {
  console.log('Seeding problems...');

  try {
    for (const problemData of sampleProblems) {
      const { examples, testCases, ...problemInfo } = problemData;

      const problem = await prisma.problem.create({
        data: {
          ...problemInfo,
          examples: {
            create: examples
          },
          testCases: {
            create: testCases
          }
        },
        include: {
          examples: true,
          testCases: true
        }
      });

      console.log(`✅ Created problem: ${problem.title}`);
    }

    console.log(`\n🎉 Successfully seeded ${sampleProblems.length} problems!`);
  } catch (error) {
    console.error('Error seeding problems:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProblems();