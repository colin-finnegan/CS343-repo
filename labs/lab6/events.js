// Do not modify these two lines:
const modal = new bootstrap.Modal('#item-name-modal', { keyboard: false });
const defaultLabel = 'Item';

// TODO: Create a buildItem function that takes one argument that is a string.
// Create and return the following HTML element as a DOM object:
//   <li class="list-group-item">Item</li>
// If the string argument is undefined, the textContent should be Item, which
// is the defaultLabel above. Otherwise, use the string as the content.

// TODO: Call buildItem with no arguments to create a <li> object. Add a click
// event listener to the returned item and append it to the unordered list
// within the collapse. The click event listener should call launchModal.

// TODO: Create a launchModal function that sets the label-name input to
// show the defaultLabel string, then call modal.show().

(function() {

  // TODO: Create a reference to the collapse div in the HTML. When the 'expand'
  // button is clicked, toggle the collapse. For reference on collapses, see
  // https://getbootstrap.com/docs/5.3/components/collapse/#methods

  // TODO: For each list item in the unordered list, add an event listener so
  // that launchModal gets called when the item is clicked.

  // TODO: When the 'add-item' button (which is a + just below the list) gets
  // clicked, call the addItem function.

  // TODO: When the 'save-button' (which is part of the modal) is clicked,
  // get the value from the form and update the itemLabels variable. Then loop
  // through the existing <li> elements and update their textContent to this
  // new value.

  // DO NOT MODIFY THIS LINE:
  let search = window.location.search.substring(1);

  // If the search variable is not the empty string (e.g., the user has
  // set a query string by accessing index.html?One&Two), loop through
  // all of the existing <li> elements in the collapse and call remove()
  // on each one to delete the hard-coded HTML items. For each term in
  // the query string, call buildItem to create a new list item then append
  // the item to the list.
  //
  // HINT: If you use search.split(), you can get an array of the terms
  // (e.g., One&Two becomes [ 'One', 'Two' ]. You can then use
  // terms.map(...).forEach(...) to create and append the items in a
  // single line.

})();
