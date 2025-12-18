import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { preloadFileDiff } from '@pierre/diffs/ssr';

import { AICodeReview } from './ai-code-review/AICodeReview';
import { AI_CODE_REVIEW_EXAMPLE } from './ai-code-review/constants';
import { FullCustomHeader } from './custom-chrome/FullCustomHeader';
import { FULL_CUSTOM_HEADER_EXAMPLE } from './custom-chrome/constants';
import { GitBlameView } from './git-blame/GitBlameView';
import { GIT_BLAME_EXAMPLE } from './git-blame/constants';
import { HoverActions } from './hover-actions/HoverActions';
import { HOVER_ACTIONS_EXAMPLE } from './hover-actions/constants';
import { PRReview } from './pr-review/PRReview';
import { PR_REVIEW_EXAMPLES } from './pr-review/constants';
import { ThemeCarousel } from './theme-carousel/ThemeCarousel';
import { THEME_CAROUSEL_EXAMPLE } from './theme-carousel/constants';

export default async function ExamplesPage() {
  const [
    customHeaderDiff,
    aiCodeReviewDiff,
    gitBlameDiff,
    themeCarouselDiff,
    hoverActionsDiff,
    ...prReviewDiffs
  ] = await Promise.all([
    preloadFileDiff(FULL_CUSTOM_HEADER_EXAMPLE),
    preloadFileDiff(AI_CODE_REVIEW_EXAMPLE),
    preloadFileDiff(GIT_BLAME_EXAMPLE),
    preloadFileDiff(THEME_CAROUSEL_EXAMPLE),
    preloadFileDiff(HOVER_ACTIONS_EXAMPLE),
    ...PR_REVIEW_EXAMPLES.map((ex) => preloadFileDiff(ex)),
  ]);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-5 xl:max-w-[80rem]">
      <Header className="-mb-[1px]" />

      <section className="space-y-6 py-12">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Examples</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Explore creative ways to customize and extend{' '}
            <code className="text-foreground">@pierre/diffs</code>. These
            examples showcase custom headers, footers, annotations, and more.
          </p>
        </div>
      </section>

      <section className="space-y-20 pb-16">
        <ThemeCarousel prerenderedDiff={themeCarouselDiff} />
        <FullCustomHeader prerenderedDiff={customHeaderDiff} />
        <HoverActions prerenderedDiff={hoverActionsDiff} />
        <AICodeReview prerenderedDiff={aiCodeReviewDiff} />
        <PRReview prerenderedDiffs={prReviewDiffs} />
        <GitBlameView prerenderedDiff={gitBlameDiff} />
      </section>

      <Footer />
    </div>
  );
}
