import { useState } from 'react';
import { Menu, MenuItem, ProductItem } from './ui/navbar-menu';

export default function Navigation() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <Menu setActive={setActiveMenu}>
            <MenuItem item="Home" active={activeMenu} setActive={setActiveMenu}></MenuItem>
            <MenuItem item="About ABDA" active={activeMenu} setActive={setActiveMenu}>
                <div className="grid grid-cols-3 gap-4">
                    <ProductItem
                        title="Research"
                        description=" Test content"
                        href=""
                        src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                    />
                    <ProductItem
                        title="Projects"
                        description=" Test content"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/09/5-Amazing-Examples-Of-Natural-Language-Processing-NLP-In-Practice-1200x639-1-1024x545.jpg"
                    />
                    <ProductItem
                        title="Lab Members"
                        description=" Test content"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/09/image-57-4-1024x379.png"
                    />
                    <ProductItem
                        title="Alumni Members"
                        description=" Test content"
                        href=""
                        src="https://www.vinai.io/wp-content/uploads/2023/01/3.-ML-shutterstock_2152292393-Horizontal-2560-px.jpg"
                    />
                    <ProductItem
                        title="Colaboration"
                        description=" Test content"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/11/DALL%C2%B7E-2023-11-22-11.45.56-A-banner-image-illustrating-the-outputs-of-Generative-AI.-The-image-should-depict-a-diverse-array-of-creative-outputs-generated-by-AI-such-as-digital-1024x585.png"
                    />
                    <ProductItem
                        title="Contact"
                        description=" Test content"
                        href=""
                        src="https://research.vinai.io/wp-content/uploads/2023/10/Machine-learning-1024x512.jpg"
                    />
                </div>
            </MenuItem>
            <MenuItem item="Publications" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
            <MenuItem item="Blog|Resources" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
            <MenuItem item="Events" active={activeMenu} setActive={setActiveMenu}>
                <ProductItem title="" description=" Test content" href="" src="" />
            </MenuItem>
        </Menu>
    );
}
