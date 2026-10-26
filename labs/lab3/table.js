/**
 * buildTableRow - takes a course and constructs the HTML table row
 * Example:
 *   course is { "number": "CS 1", "title": "CS Stuff",
 *               "prerequisites": [ "CS 0" ], "description": "Do stuff" }
 *   returned string:
 *     '<tr id="cs-1"><th><a href="course.html?cs-1">CS 1</a></th><td>CS Stuff</td><td><a href="#cs-0">CS 0</a></td></tr>'
 * Notes:
 *   All text is case-sensitive.
 *   Spaces between the HTML tags is optional. ("<th><a..." and "<th> <a..."
 *   are both okay.) If there is more than one prerequisite, each gets its own
 *   <a> tag with a space between them. If there are no prequisites, that part
 *   should be <td><em>none</em></td>. The description is not used for this
 *   function.
 */
function buildTableRow(course) {
  // YOUR CODE HERE
  let row = `<tr id = "${course.number.toLowerCase().split(' ').join('-')}">`;

  row += `<th><a href="course.html?${course.number.toLowerCase().split(' ').join('-')}">${course.number}</a></th>`;

  row += `<td>${course.title}</td>`;

  if (course.prerequisites.length > 0) {
    row += '<td>';
    row += course.prerequisites.map(prerequisite => 
      `<a href="#${prerequisite.toLowerCase().split(' ').join('-')}">${prerequisite}</a>`
    ).join(' ');
    row += '</td>';
  } else {
    row += '<td><em>none</em></td>';
  }

  row += '</tr>';

  return row;
}

// IMPORTANT: Do not modify or delete the next line:
(function() {

  // Step 3: Include code to filter based on text in the course description.
  // For the URL foo.html?a=b, use the window.location.search global variable
  // to get the '?a=b' substring. In this lab, if the search string is
  // '?terms=algorithm' then you should only show the courses that have the
  // word 'algorithm' in their description. For simplicity, you can do a
  // case-sensitive search so 'Algorithm' would not necessarily be matched.

  // Optional: You are only required to search based on one word at a time.
  // If the user entered more than one word, the query string would be of the
  // form '?terms=algorithm+logic'. For more practice, you can split this into
  // the two terms 'algorithm' and 'logic' and only show courses that contain
  // both.

  // YOUR CODE HERE
  const queryString = window.location.search;

  if (queryString.includes('terms=')) {
    const termsParam = queryString.split('terms=')[1];

    const searchTerms = termsParam.split('+');

    const filteredCourses = courses.filter(course => {
      
      const descriptionLower = course.description.toLowerCase();
      
      return searchTerms.every(term => {
        return descriptionLower.includes(term.toLowerCase());
      });
    });

    document.write('<table border="1">');

    filteredCourses.forEach(course => {
      document.write(buildTableRow(course));
    });

    document.write('</table>');
    
  } else {
    document.write('<table border="1">');
    courses.forEach(course => {
      document.write(buildTableRow(course));
    });
    document.write('</table>');
  }
// IMPORTANT: Do not modify or delete the next line:
})();
