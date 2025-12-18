'use client';

import { IconChevron } from '@/components/icons';
import { FileDiff } from '@pierre/diffs/react';
import type { PreloadFileDiffResult } from '@pierre/diffs/ssr';
import { useState } from 'react';

import { THEMES } from './constants';

// =============================================================================
// Main Component
// =============================================================================

interface ThemeCarouselProps {
  prerenderedDiff: PreloadFileDiffResult<undefined>;
}

export function ThemeCarousel({ prerenderedDiff }: ThemeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTheme = THEMES[currentIndex];

  const prev = () =>
    setCurrentIndex((i) => (i === 0 ? THEMES.length - 1 : i - 1));
  const next = () =>
    setCurrentIndex((i) => (i === THEMES.length - 1 ? 0 : i + 1));

  // Colors based on current theme type
  const isDark = currentTheme.type === 'dark';
  const containerBg = isDark ? 'bg-neutral-950' : 'bg-neutral-100';
  const borderColor = isDark ? 'border-neutral-800' : 'border-neutral-300';
  const textColor = isDark ? 'text-neutral-200' : 'text-neutral-800';
  const mutedText = isDark ? 'text-neutral-500' : 'text-neutral-500';
  const pillBg = isDark ? 'bg-neutral-800' : 'bg-neutral-200';

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-medium">Theme Carousel</h2>
        <p className="text-muted-foreground">
          Browse through {THEMES.length} beautiful syntax themes. Use any Shiki
          theme or our custom Pierre themes designed for optimal diff
          readability.
        </p>
      </div>

      <div
        className={`overflow-hidden rounded-xl border ${borderColor} ${containerBg} transition-colors duration-300`}
      >
        {/* Header with navigation */}
        <div
          className={`flex items-center justify-between border-b ${borderColor} px-4 py-3`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg ${pillBg} ${textColor} transition-opacity hover:opacity-80`}
              aria-label="Previous theme"
            >
              <IconChevron size={16} style={{ transform: 'rotate(90deg)' }} />
            </button>
            <button
              onClick={next}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg ${pillBg} ${textColor} transition-opacity hover:opacity-80`}
              aria-label="Next theme"
            >
              <IconChevron size={16} style={{ transform: 'rotate(-90deg)' }} />
            </button>
          </div>

          <div className={`text-center ${textColor}`}>
            <span className="font-medium">{currentTheme.label}</span>
            <span className={`ml-2 text-sm ${mutedText}`}>
              {currentIndex + 1} / {THEMES.length}
            </span>
          </div>

          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${pillBg} ${
              isDark ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            {currentTheme.type}
          </div>
        </div>

        {/* Theme indicator dots */}
        <div
          className={`flex justify-center gap-1.5 border-b ${borderColor} py-2`}
        >
          {THEMES.map((theme, i) => (
            <button
              key={theme.name}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
                i === currentIndex
                  ? 'scale-125 bg-blue-500'
                  : isDark
                    ? 'bg-neutral-700 hover:bg-neutral-600'
                    : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Switch to ${theme.label}`}
            />
          ))}
        </div>

        {/* Diff content */}
        <FileDiff
          {...prerenderedDiff}
          options={{
            ...prerenderedDiff.options,
            theme: currentTheme.name,
            themeType: currentTheme.type,
            disableFileHeader: true,
          }}
        />
      </div>
    </div>
  );
}
