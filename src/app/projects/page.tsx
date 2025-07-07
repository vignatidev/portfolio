'use client'

import './page.scss';

import { useEffect, useState } from 'react';

import ProjectCard from './project-card';
import { projects } from './projects';
import Image from 'next/image';


export default function ProjectsPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(projects);

  let filters: string[] = ["Angular","NextJs", "VueJs", "NuxtJs", "Spring", "NodeJs"];

  const handleFilterButtonClick = (selectedCategory: string) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = projects.filter((project) => project.category === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...projects]);
    }
  };


  return (
    <main className='projects_layout'>
      <aside className="projects_aside">
        <div className="buttons-container">
          {filters.map((category, idx) => (
            <span>
              <button
                onClick={() => handleFilterButtonClick(category)}
                className={`button ${selectedFilters?.includes(category) ? "active" : ""
                  }`}
                key={`filters-${idx}`}
                id={category}
              ></button>
              <label htmlFor={category}><Image src={`./icons/default/${category}.svg`} width={24} height={24} alt={category} /><div>{category}</div></label>
            </span>
          ))}
        </div>
      </aside>
      <section>
        <div className="projects_grid">
          {filteredItems.map((item) => (
            <ProjectCard data={item} />
          ))}
        </div>
      </section>
    </main>
  )
}