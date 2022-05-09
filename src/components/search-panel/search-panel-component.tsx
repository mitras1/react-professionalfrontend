import React, { useState } from 'react';
import SearchPanelProps from './search-panel-props';

const SearchPanel: React.FC<SearchPanelProps> = props => {
    const [searchString, setSearchString] = useState("");

    const handleEvent = (e: any) => {
        setSearchString(e.target.value);

        if (props.handleSearch !== undefined) {
            props.handleSearch(e.target.value);
        }
    };

    let markup = (
        <div className='panel panel-primary'>
            <div className='panel-heading'>
                Customers Search Panel {searchString && (<span>Searching ... {searchString}</span>)}
            </div>

            <div className='panel-body'>
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">
                        Customer Name:
                    </span>

                    <input type="text" className="form-control"
                        onChange={e => handleEvent(e)}
                        placeholder="Enter Search String Here ..."
                        aria-describedby="basic-addon1" />
                </div>
            </div>
        </div>
    );

    return markup;
};

export default SearchPanel;
