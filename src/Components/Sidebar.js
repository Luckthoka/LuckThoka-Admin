import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar_cls">
        <div className="sidenav">
          <ul className="ulcls">
            {/* <li>
              <Link to="/" activeClassName="active">
                Create Pool in Contract
              </Link>
            </li> */}
            <li>
              <Link to="/CreatedPool" activeClassName="active">
                Created Pools
              </Link>
            </li>
            <li>
              <Link to="/CreatePool" activeClassName="active">
                Create Pool Content
              </Link>
            </li>
            <li>
              <Link to="/DrawWinner" activeClassName="active">
                Draw Winner
              </Link>
            </li>

            <li>
              <Link to="/LottaryPools" activeClassName="active">
                Lottery Pools
              </Link>
            </li>
            <li>
              <Link to="/GetLottaryById" activeClassName="active">
                Get Lottery Pool by ID
              </Link>
            </li>
            <li>
              <Link to="/GetMemberByID" activeClassName="active">
                Get Lottery Pool Member by ID
              </Link>
            </li>
            {/* <li>
              <Link to="/Owner" activeClassName="active">
                Owner
              </Link>
            </li> */}

            <li>
              <Link to="/CreatePageContent" activeClassName="active">
                Landing page Content
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
