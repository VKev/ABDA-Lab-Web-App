import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeItemMenuItem, setActiveItemMenu] = useState<string | null>(null);
    const [activeItemProduct, setActiveItemProduct] = useState<string | null>(null);

    return (
        <Menu setActive={activeMenu}>
            <MenuItem item="Home" active={activeItemMenuItem} setActive={setActiveItemMenu}>
                <ProductItem item="Product 1" active={activeItem} setActive={setActiveItem}></ProductItem>
            </MenuItem>
            <MenuItem item="About ABDA" active={activeItem} setActive={setActiveItem}>
                Content 2
            </MenuItem>
            <MenuItem item="Publications" active={activeItem} setActive={setActiveItem}>
                Content 3
            </MenuItem>
            <MenuItem item="Blog/Resources" active={activeItem} setActive={setActiveItem}>
                Content 4
            </MenuItem>
            <MenuItem item="Events" active={activeItem} setActive={setActiveItem}>
                Content 5
            </MenuItem>
        </Menu>
    );
}
