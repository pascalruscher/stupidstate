# StupidState

## Description

StupidState is a simple JavaScript library designed to streamline state management across applications with multiple components. This library is particularly useful for scenarios where standalone components need to share the same information, operate independently, and avoid redundant API calls or unnecessary updates when setting state variables.

## State

Currently, the library is under development and not ready for general use. Please check back later for updates.

## How to use

### To register a service:

**_TODO: Needs to be defined to follow a specific pattern_**

You can register a service with a using the following syntax:

```Javascript
window.stupidstate.registerService(MyClass)
```

### To register a value:

A value can be registered with a specific definition using the following syntax:

```Javascript
window.stupidstate.registerValue('myDefinition', myValue)
```

### Events

The library emits events with the definition **_stupidstate_**.

Here are the available events:

- **registeredValue**: Triggered when a new value is registered.
- **registeredService**: Triggered when a new service is registered.
- **changedValue**: Triggered when a value is changed.
- **changedService**: Triggered when a service is changed.
