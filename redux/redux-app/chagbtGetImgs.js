const fs = require('fs');
const path = require('path');

/**
 * Custom function to mimic require.context in Node.js.
 * @param {string} directory - The directory to search.
 * @param {boolean} recursive - Whether to include subdirectories.
 * @param {RegExp} regExp - Regular expression to match files.
 * @returns {Function} A context function that can load modules.
 */
function customRequireContext(directory, recursive, regExp) {
  let keys = [];

  // Function to recursively read directories
  function readDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && recursive) {
        readDirectory(fullPath);
      } else if (regExp.test(file)) {
        // Save key relative to the original directory, prefixed with "./"
        keys.push('./' + path.relative(directory, fullPath).replace(/\\/g, '/'));
      }
    });
  }
  readDirectory(directory);

  // The context function that will load a module by key
  function context(key) {
    // Resolve the full path of the module and require it
    return require(path.join(directory, key));
  }

  // Attach a keys() method to list available modules
  context.keys = function() {
    return keys;
  };

  return context;
}

// Example usage:
const imgsContext = customRequireContext(path.join(__dirname, 'imgs'), false, /\.(png|jpe?g|svg)$/);
console.log(imgsContext.keys()); // Might output: [ './img1.png', './img2.jpg', ... ]