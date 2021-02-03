# @jrh-works/assure

Simple Node.js object property validations, with companion [Chai](http://chaijs.com) assertions.

## Installation

`npm install @jrh-works/assure`

## The Validation Function

### Usage

`const { assureProperties } = require('@jrh-works/assure')`

### Syntax

```
assureProperties(properties, target)
```

### Example Usage

```javascript
const object = { a: 1, b: 2, c: 3 }

assureProperties([ 'a', 'b', 'c' ], { of: object, type: 'arbitrary' })
```

### Arguments

| Name | Type | Description |
| :-- | :-- | :-- |
| properties | Array | A list of properties to validate. |
| target | [Object: Target](#the-target-object) | Information about the object to validate. |

### Returns

| Type | Description |
| :-- | :-- |
| Object | The targeted object. |

### Exceptions

Throws a standard `Error` if all properties are not present in the target object.

---

#### The Target Object

| Attribute | Type | Description |
| :-- | :-- | :-- |
| of | Object | The object to validate. |
| type | String *(optional)* | A name for the type of object to include in error messages. |

---

## [Chai](http://chaijs.com) Assertions

```javascript
const chai = require('chai')
const { isAssured } = require('@jrh-works/assure')

chai.use(isAssured)
```

### `.assuredBy()`

Checks if all an object's properties are assured within a test function.

#### Syntax

```
assuredBy(test, exclusions)
```

#### Arguments

| Name | Type | Description |
| :-- | :-- | :-- |
| test | Function | A testing function which will be passed one or more invalid version(s) of an object. |
| exclusions | [Object: Exclusions](#the-exclusions-object) | Fields not to validate. |

#### Example Usage

```javascript
function eat(food) {
  assureProperties([ 'flavor', 'temperature' ], { of: food })
}

// Passing test.
it('only accepts valid foods', () => {
  expect({ flavor: 'salty', temperature: 'hot', texture: 'smooth' }).to.be.assuredBy(invalidObject => {
    eat(invalidObject)
  }, { exclude: 'texture' })
})

// Failing test.
it('only accepts valid foods', () => {
  expect({ color: 'brown' }).to.be.assuredBy(invalidObject => {
    eat(invalidObject)
  })
})
```

---

#### The Exclusions Object

| Attribute | Type | Description |
| :-- | :-- | :-- |
| exclude | Array | A list of fields to exclude from validation. |

---

### `.assuredByAsync()`

The same as [`.assuredBy()`](#assuredBy), but accepts an asynchronous test function.

#### Example Usage

```javascript
async function sendDataAbout(food) {
  assureProperties([ 'flavor', 'temperature' ], { of: food })
  await MyFoodAPI.post({ food })
}

// Passing test.
it('only accepts valid foods', () => {
  return expect({ flavor: 'salty', temperature: 'hot', texture: 'smooth' }).to.be.assuredByAsync(async (invalidObject) => {
    await sendDataAbout(invalidObject)
  }, { exclude: 'texture' })
})

// Failing test.
it('only accepts valid foods', () => {
  return expect({ color: 'brown' }).to.be.assuredByAsync(async (invalidObject) => {
    await sendDataAbout(invalidObject)
  })
})
```
