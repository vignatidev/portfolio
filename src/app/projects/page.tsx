'use client'

import './page.scss';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n';

import ProjectCard from './project-card';
import { projects, PROJECT_TYPES, type ProjectType } from './projects';

// File names of the grey filter icons in /public/icons/default.
const TECH_ICONS: Record<string, string> = {
  angular: 'Angular',
  css: 'CSS',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  kotlin: 'Kotlin',
  nextjs: 'NextJs',
  nodejs: 'NodeJs',
  nuxtjs: 'NuxtJs',
  postgres: 'Postgres',
  railway: 'Railway',
  reactjs: 'ReactJs',
  spring: 'Spring',
  tailwind: 'Tailwind',
  typescript: 'TypeScript',
  vuejs: 'VueJs',
};

// Only technologies used by at least one project get a filter.
const TECHS = Array.from(
  new Map(projects.flatMap((p) => p.tech).map((tech) => [tech.stack, tech.alt])).entries(),
).map(([stack, label]) => ({ stack, label }));

const toggle = <T,>(list: T[], item: T) =>
  list.includes(item) ? list.filter((el) => el !== item) : [...list, item];

interface FilterProps {
  label: string;
  count: number;
  checked: boolean;
  featured?: boolean;
  icon?: string;
  onChange: () => void;
}

function Filter({ label, count, checked, featured, icon, onChange }: FilterProps) {
  return (
    <label className={featured ? 'filter is-featured' : 'filter'}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="box" aria-hidden="true" />
      {icon && <Image src={icon} width={20} height={20} alt="" />}
      <span className="filter_label">{label}</span>
      <em className="filter_count">{count}</em>
    </label>
  );
}

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const typeLabel: Record<ProjectType, string> = {
    automation: t.type_automation,
    backend: t.type_backend,
    frontend: t.type_frontend,
    ai: t.type_ai,
  };

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (selectedTypes.length === 0 || project.types.some((type) => selectedTypes.includes(type))) &&
          (selectedTech.length === 0 || project.tech.some((tech) => selectedTech.includes(tech.stack))),
      ),
    [selectedTypes, selectedTech],
  );

  const hasFilters = selectedTypes.length > 0 || selectedTech.length > 0;
  const countOfType = (type: ProjectType) => projects.filter((p) => p.types.includes(type)).length;
  const countOfTech = (stack: string) => projects.filter((p) => p.tech.some((tech) => tech.stack === stack)).length;
  const onlyEmptyTypes = selectedTypes.length > 0 && selectedTypes.every((type) => countOfType(type) === 0);

  return (
    <main className="projects_layout">
      <aside className="projects_aside">
        <div className="filter_group">
          <h3 className="filter_title">// {t.filter_type}</h3>
          {PROJECT_TYPES.map((type) => (
            <Filter
              key={type}
              label={typeLabel[type]}
              count={countOfType(type)}
              checked={selectedTypes.includes(type)}
              featured={type === 'automation'}
              onChange={() => setSelectedTypes((list) => toggle(list, type))}
            />
          ))}
        </div>

        <div className="filter_group">
          <h3 className="filter_title">// {t.filter_tech}</h3>
          {TECHS.map(({ stack, label }) => (
            <Filter
              key={stack}
              label={label}
              count={countOfTech(stack)}
              checked={selectedTech.includes(stack)}
              icon={TECH_ICONS[stack] ? `/icons/default/${TECH_ICONS[stack]}.svg` : undefined}
              onChange={() => setSelectedTech((list) => toggle(list, stack))}
            />
          ))}
        </div>

        {hasFilters && (
          <button
            type="button"
            className="filter_clear"
            onClick={() => {
              setSelectedTypes([]);
              setSelectedTech([]);
            }}
          >
            {t.filter_clear}
          </button>
        )}
      </aside>

      <section>
        <div className="projects_grid">
          {filtered.map((item) => (
            <ProjectCard key={item.id} data={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="projects_empty">{onlyEmptyTypes ? t.empty_soon : t.empty_combo}</p>
        )}
      </section>
    </main>
  );
}
