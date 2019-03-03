export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

export const createReducer = (initialState, handlers) =>
  function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };

export const createGroup = (requireNum, groupName, coursesName) => {
  const group = {};
  group.requireNum = requireNum;
  group.groupName = groupName;
  group.courses = [];
  for (const name of coursesName) {
    group.courses.push({
      title: name,
      passed: false
    });
  }
  return group;
};

export const createCourseArray = (courseName, inputs) => {
  const courses = [];
  for (const input of inputs) {
    courses.push(courseName(input));
  }
  return courses;
};

export const updateObject = (oldObject, newValues) =>
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  Object.assign({}, oldObject, newValues);

export const updateItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
};
