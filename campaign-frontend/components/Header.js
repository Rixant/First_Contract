import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

function Header () {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link className="item" route="/">
                CrowdCoin
            </Link>

            <Menu.Menu position="right">
                <Link className="item" route="/">
                    Campaigns
                </Link>

                <Link className="item" route="/campaigns/new">
                    +
                </Link>
                {/* <Menu.Item>+</Menu.Item> */}
            </Menu.Menu>
        </Menu>
    )
}

export default Header;