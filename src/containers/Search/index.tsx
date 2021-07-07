import React from 'react';

// components
import SearchGame from './SearchGame';
import SearchProfile from './SearchProfile';

// let renderCount = 0;
export default function SearchComponents() {
  // renderCount++;
  return (
    <>
      <div>
        <h3>SearchGame component</h3>
        <h5>Options:</h5>
        <p>
          <strong>navigate</strong>:<em> Boolean, </em>
          <span>
            if true, it navigates to the selected page when clicked on the item.
            If false, the clicked item is added to the list below search input
          </span>
          <br />
          <strong>multiple</strong>:<em> Boolean, </em>
          <span>
            if true, can add multiple items to the list. The dropdown does not
            dismiss on item click and it still opens for other items to be
            added. If false, they can add only one item each time
          </span>
          <br />
          <strong>clearInput</strong>:<em> Boolean, </em>
          <span>if true, clears the input after item is selected</span>
          <br />
          <strong>initLoad</strong>:<em> Boolean, </em>
          <span>
            if true, loads the data and shows dropdown on component load
          </span>
          <br />
          <br />
          <span>
            <em>(Hide on ESC)</em>
          </span>
        </p>
      </div>
      <div>
        <h5>Navgiate </h5>
        <pre>{'<SearchGame navigate />'}</pre>
        <SearchGame navigate />
      </div>

      <div>
        <h5>List (multiple)</h5>
        <pre>
          {'<SearchGame multiple clearInput initLoad />'} Press ESC to finish
        </pre>
        <SearchGame multiple clearInput initLoad />
      </div>
      <div>
        <h3>SearchProfile component</h3>
        <p>
          <strong>
            <em>Same options as SearchGame component</em>
          </strong>
        </p>
      </div>
      <div>
        <h5>Navigate </h5>
        <pre>{'<SearchProfile navigate/>'}</pre>
        <SearchProfile navigate />
      </div>
      <div>
        <h5>List (single) </h5>
        <pre>{'<SearchProfile multiple initLoad />'}</pre>
        <SearchProfile multiple initLoad />
      </div>
    </>
  );
}
