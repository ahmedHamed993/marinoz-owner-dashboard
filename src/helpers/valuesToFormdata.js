export function valuesToFormData(values) {
  const formData = new FormData();
  for (let i in values) {
    if (isFile(values[i])) {
      formData.append(i, values[i]);
    } else {
      formData.append(i, values[i]);
    }
  }
  return formData;
}

// function isPlainObject(value) {
//   if (typeof value === 'object' && !Array.isArray(value)) {
//     return true;
//   }
//   return false;
// }

function isFile(value) {
  if (value instanceof File) {
    return true;
  }
  return false;
}

// function isArrayWithChildObjects(value) {
//   if (Array.isArray(value)) {
//     if (value.length && typeof value[0] === 'object') {
//       return true;
//     }
//   }
//   return false;
// }

// function isArrayWithoutChildObjects(value) {
//   if (Array.isArray(value)) {
//     if (value.length && typeof value[0] !== 'object') {
//       return true;
//     }
//   }
//   return false;
// }

// function logFormData(formData) {
//   for (let [key, value] of formData) {
//     console.log("=>", key, value);
//     console.log("===".repeat(20));
//   }
// }
