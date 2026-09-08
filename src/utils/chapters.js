/**
 * Chapter metadata and coordinate utility definitions for DAY ZERO documentary.
 * Canvas total height: 5200px
 * Hero path start Y: 120px
 * CTA path end Y: 5050px
 */

export const CANVAS_HEIGHT = 5200;
export const PATH_START_Y = 120;
export const PATH_END_Y = 5050;
export const PATH_RANGE_Y = PATH_END_Y - PATH_START_Y; // 4930px

export const CHAPTERS_DATA = [
  {
    id: '01',
    title: 'EVERY JOURNEY BEGINS SOMEWHERE',
    subtitle: 'Every product starts before there is a product. That is where DAY ZERO begins.',
    seoTitle: 'DAY ZERO — Every Journey Begins Somewhere | Building Products',
    metaDescription: 'Explore how DAY ZERO approaches the beginning of product development — from the first idea and early research to prototypes, experiments and the first commit.',
    primaryTopic: 'Starting to build products',
    ctaText: 'START THE JOURNEY →',
    yPos: 750,
    startY: 600,
    topCss: '750px',
  },
  {
    id: '02',
    title: 'THE PROBLEM',
    subtitle: 'The finished version hides the process. DAY ZERO exists to make that distance visible.',
    seoTitle: 'DAY ZERO — The Problem | What Product Building Really Looks Like',
    metaDescription: 'Why do we only see finished products? DAY ZERO documents the failed experiments, difficult decisions, iterations and unfinished work behind product development.',
    primaryTopic: 'Product development process',
    ctaText: 'SEE THE PROCESS →',
    yPos: 1400,
    startY: 1250,
    topCss: '1400px',
  },
  {
    id: '03',
    title: 'OUR BELIEF',
    subtitle: 'Every journey has a Day Zero. We believe the beginning matters.',
    seoTitle: 'DAY ZERO — Our Belief | Learning Through Building',
    metaDescription: 'Discover the DAY ZERO philosophy: commit, build, test, learn and iterate. A practical approach to learning through real product development.',
    primaryTopic: 'Learning by building',
    ctaText: 'EXPLORE THE PRINCIPLES →',
    yPos: 2050,
    startY: 1900,
    topCss: '2050px',
  },
  {
    id: '04',
    title: 'BUILD IN PUBLIC',
    subtitle: 'The process is part of the product. Don\'t just show what worked. Show what you learned.',
    seoTitle: 'DAY ZERO — Build in Public | Product & Engineering Documentation',
    metaDescription: 'DAY ZERO documents products, engineering projects, prototypes, experiments, failures and lessons while they are being built in public.',
    primaryTopic: 'Build in public',
    ctaText: 'ENTER THE BUILD LOG →',
    yPos: 2700,
    startY: 2550,
    topCss: '2700px',
  },
  {
    id: '05',
    title: 'CURRENT MISSIONS',
    subtitle: 'The work is happening now. No invented metrics. No artificial progress. Just the work.',
    seoTitle: 'DAY ZERO — Current Missions | Products & Engineering Projects',
    metaDescription: 'Explore the products, engineering projects and experiments currently being built, tested and documented by DAY ZERO.',
    primaryTopic: 'Engineering projects',
    ctaText: 'EXPLORE CURRENT MISSIONS →',
    yPos: 3350,
    startY: 3200,
    topCss: '3350px',
  },
  {
    id: '06',
    title: 'FUTURE ECOSYSTEM',
    subtitle: 'More than a website. An ecosystem built around creating, learning and documenting.',
    seoTitle: 'DAY ZERO — Future Ecosystem | Products, Learning & Documentation',
    metaDescription: 'Explore the DAY ZERO vision for an ecosystem connecting products, engineering projects, documentation, knowledge, learning and community.',
    primaryTopic: 'Product and engineering learning ecosystem',
    ctaText: 'EXPLORE THE ECOSYSTEM →',
    yPos: 4000,
    startY: 3850,
    topCss: '4000px',
  },
  {
    id: '07',
    title: 'MANIFESTO',
    subtitle: 'We choose to begin before everything is figured out. This is DAY ZERO.',
    seoTitle: 'DAY ZERO — Manifesto | Build, Learn, Document, Iterate',
    metaDescription: 'Read the DAY ZERO manifesto: begin before you\'re ready, build in public, document the process, learn through iteration and keep moving.',
    primaryTopic: 'Build in public philosophy',
    ctaText: 'START YOUR DAY ZERO →',
    yPos: 4650,
    startY: 4500,
    topCss: '4650px',
  },
];

export const CHAPTERS_SEO = CHAPTERS_DATA.reduce((acc, ch) => {
  acc[ch.id] = {
    seoTitle: ch.seoTitle,
    metaDescription: ch.metaDescription,
    primaryTopic: ch.primaryTopic,
  };
  return acc;
}, {});


/**
 * Converts a target Y position on the SVG canvas (e.g. chapter startY)
 * to the exact target window scrollY based on current viewport height.
 */
export function getScrollYForCanvasY(canvasY, viewportHeight = window.innerHeight, canvasHeight = CANVAS_HEIGHT) {
  const maxScroll = canvasHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  const ratio = (canvasY - PATH_START_Y) / PATH_RANGE_Y;
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  return Math.round(clampedRatio * maxScroll);
}

/**
 * Converts the current window scrollY to the corresponding drawing head Y coordinate
 * on the SVG canvas based on current viewport height.
 */
export function getCanvasYForScrollY(scrollY, viewportHeight = window.innerHeight, canvasHeight = CANVAS_HEIGHT) {
  const maxScroll = canvasHeight - viewportHeight;
  if (maxScroll <= 0) return PATH_START_Y;
  const ratio = Math.max(0, Math.min(1, scrollY / maxScroll));
  return PATH_START_Y + ratio * PATH_RANGE_Y;
}

/**
 * Full editorial content for Chapter 01
 */
export const CHAPTER_01_CONTENT = {
  id: '01',
  numberLabel: 'CHAPTER 01',
  title: 'EVERY JOURNEY BEGINS SOMEWHERE',
  subtitle: 'Every product starts before there is a product. That is where DAY ZERO begins.',
  sections: [
    {
      id: 'origin',
      index: '01',
      title: 'THE ORIGIN',
      paragraphs: [
        'Every product starts before there is a product.',
        'There is an idea.',
        'A question.',
        'A problem that keeps coming back.',
        'Sometimes there is only a rough thought that doesn\'t yet have a name.',
        'That is where DAY ZERO begins.',
        'Not at launch.',
        'Not at the first customer.',
        'Not at the polished version.',
        'At the point where an idea becomes a commitment to find out what it could become.'
      ]
    },
    {
      id: 'first-commit',
      index: '02',
      title: 'THE FIRST COMMIT',
      paragraphs: [
        'The first commit is rarely impressive.',
        'It might be an empty repository.',
        'A rough sketch.',
        'A paragraph of notes.',
        'A prototype that barely works.',
        'A conversation that turns into a question worth exploring.',
        'But it changes something.',
        'An idea that existed only in your head now has a physical form.',
        'Something can be tested.',
        'Something can be questioned.',
        'Something can fail.',
        'And because it can fail, it can also improve.',
        'That is the significance of Day Zero.',
        'It is the moment possibility becomes a process.'
      ]
    },
    {
      id: 'why-the-beginning-matters',
      index: '03',
      title: 'WHY THE BEGINNING MATTERS',
      paragraphs: [
        'The beginning is often treated as the least interesting part of a product story.',
        'There is nothing polished to show.',
        'No impressive numbers.',
        'No finished interface.',
        'No success story.',
        'But the beginning contains something that the finished product cannot show on its own: how the decisions were made.',
        'Why was this idea chosen?',
        'What problem was being explored?',
        'What assumptions existed?',
        'What did we believe would happen?',
        'What turned out to be wrong?',
        'Those questions become the foundation of everything that follows.'
      ]
    },
    {
      id: 'the-day-zero-principle',
      index: '04',
      title: 'THE DAY ZERO PRINCIPLE',
      paragraphs: [
        'We don\'t believe you need to know the entire path before taking the first step.',
        'You need enough clarity to begin.',
        'Then the work creates information.',
        'Information changes decisions.',
        'Decisions shape the next iteration.',
        'The path becomes clearer by moving through it.',
        'That is how products are built.'
      ]
    },
    {
      id: 'what-we-document',
      index: '05',
      title: 'WHAT WE DOCUMENT',
      intro: 'At the beginning of a project, we want to capture:',
      items: [
        'The original idea',
        'The problem being explored',
        'The assumptions behind it',
        'Early research',
        'Initial sketches',
        'First prototypes',
        'Early technical decisions',
        'Questions we don\'t yet have answers to',
        'What changes as we learn'
      ],
      conclusion: [
        'The goal isn\'t to make the beginning look impressive.',
        'The goal is to make it visible.'
      ]
    },
    {
      id: 'the-closing-commit',
      index: '06',
      title: 'THE FIRST COMMIT',
      paragraphs: [
        'There is always a first commit.',
        'Ours is DAY ZERO.'
      ]
    }
  ]
};

export const CHAPTER_02_CONTENT = {
  id: '02',
  numberLabel: 'CHAPTER 02',
  title: 'THE PROBLEM',
  subtitle: 'The finished version hides the process. DAY ZERO exists to make that distance visible.',
  sections: [
    {
      id: 'hiding-the-process',
      index: '01',
      title: 'THE FINISHED VERSION HIDES THE PROCESS',
      paragraphs: [
        'Most product stories begin near the end.',
        'The product exists.',
        'The interface is polished.',
        'The launch has happened.',
        'The difficult decisions have already been made.',
        'The messy versions have disappeared.',
        'But that isn\'t what building actually looks like.',
        'Building is uncertain.',
        'It involves incomplete information, competing ideas, failed experiments, technical limitations, changing assumptions, and decisions that only make sense after you learn something new.'
      ]
    },
    {
      id: 'the-missing-story',
      index: '02',
      title: 'THE MISSING STORY',
      lead: 'When we only see the final result, we lose the context around it.',
      intro: 'We don\'t see:',
      items: [
        'Why one idea was rejected.',
        'Why a prototype was rebuilt.',
        'Why a feature was removed.',
        'Why a technical approach changed.',
        'Why an experiment failed.',
        'Why the team decided to continue.'
      ],
      callout: [
        'The finished product tells us what exists.',
        'The process tells us why it exists.',
        'DAY ZERO is interested in the second story.'
      ]
    },
    {
      id: 'failure-is-information',
      index: '03',
      title: 'FAILURE IS INFORMATION',
      lead: [
        'A failed experiment isn\'t automatically wasted work.',
        'It tells you something.'
      ],
      diagnostics: [
        'Perhaps the assumption was wrong.',
        'Perhaps the problem wasn\'t important enough.',
        'Perhaps the implementation was flawed.',
        'Perhaps the timing was wrong.',
        'Perhaps the idea needs to change.'
      ],
      pivot: {
        notThis: 'Did this fail?',
        thisOne: 'What did this teach us?'
      },
      conclusion: 'That shift turns failure from something to hide into something to document.'
    },
    {
      id: 'cost-of-hiding',
      index: '04',
      title: 'THE COST OF HIDING THE PROCESS',
      lead: 'When only successful outcomes are visible, building can look deceptively simple.',
      mythSteps: [
        'Someone has an idea.',
        'They build it.',
        'It works.',
        'People use it.',
        'The story ends.'
      ],
      reality: [
        'Real product development is rarely that clean.',
        'The distance between an idea and a working product is filled with decisions.',
        'DAY ZERO exists to make that distance visible.'
      ]
    },
    {
      id: 'what-we-want-to-show',
      index: '05',
      title: 'WHAT WE WANT TO SHOW',
      items: [
        'The rejected version.',
        'The rough version.',
        'The confusing version.',
        'The experiment that didn\'t work.',
        'The question that changed the direction.',
        'The technical problem that took longer than expected.',
        'The decision that looked obvious only afterwards.',
        'The iteration that finally moved things forward.'
      ],
      closing: [
        'This is not a collection of mistakes.',
        'It is the record of building.'
      ]
    },
    {
      id: 'the-problem-we-are-solving',
      index: '06',
      title: 'THE PROBLEM WE ARE SOLVING',
      paragraphs: [
        'There is already plenty of information about how successful products look.',
        'We want to document what it takes to make them real.',
        'That means treating the process itself as something worth learning from.'
      ]
    }
  ]
};

export const CHAPTER_03_CONTENT = {
  id: '03',
  numberLabel: 'CHAPTER 03',
  title: 'OUR BELIEF',
  subtitle: 'Every journey has a Day Zero. We believe the beginning matters.',
  sections: [
    {
      id: 'every-journey-has-a-day-zero',
      index: '01',
      title: 'EVERY JOURNEY HAS A DAY ZERO',
      intro: [
        'DAY ZERO is built around a simple belief:',
        'the beginning matters.'
      ],
      starts: [
        'Every product has a point where nothing is certain yet.',
        'Every builder has a first project.',
        'Every engineer has a first system they had to figure out.',
        'Every creator has a first piece of work that wasn\'t quite what they wanted.'
      ],
      callout: [
        'Those beginnings are not evidence that someone is inexperienced.',
        'They are evidence that they started.'
      ]
    },
    {
      id: 'building-is-a-learning-process',
      index: '02',
      title: 'BUILDING IS A LEARNING PROCESS',
      lead: [
        'We don\'t see product development as a straight line.',
        'It is a loop.'
      ],
      loopSteps: [
        { label: 'COMMIT', desc: 'Decide that the problem is worth exploring.' },
        { label: 'BUILD', desc: 'Turn the idea into something tangible.' },
        { label: 'TEST', desc: 'Put assumptions under pressure.' },
        { label: 'LEARN', desc: 'Pay attention to what actually happens.' },
        { label: 'ITERATE', desc: 'Change the product based on what was learned.' },
        { label: 'BUILD AGAIN', desc: 'Return to the problem with better information.' }
      ],
      closing: 'That cycle continues.'
    },
    {
      id: 'commitment',
      index: '03',
      title: 'COMMITMENT',
      paragraphs: [
        'Commitment is not certainty.',
        'It is choosing to begin despite uncertainty.',
        'You don\'t commit because you know the outcome.',
        'You commit because the question is worth answering.'
      ]
    },
    {
      id: 'discipline',
      index: '04',
      title: 'DISCIPLINE',
      paragraphs: [
        'Ideas are easy to start.',
        'Progress requires consistency.',
        'Documentation, testing, iteration and reflection only become valuable when they become part of the process.',
        'Discipline turns occasional effort into a system for learning.'
      ]
    },
    {
      id: 'learning',
      index: '05',
      title: 'LEARNING',
      paragraphs: [
        'Every experiment should leave you knowing something you didn\'t know before.',
        'Sometimes that knowledge confirms the direction.',
        'Sometimes it changes it.',
        'Both are useful.',
        'Learning is not a separate stage after building.',
        'It is part of building.'
      ]
    },
    {
      id: 'iteration',
      index: '06',
      title: 'ITERATION',
      lead: 'The first version is a starting point, not a verdict.',
      steps: [
        'Build.',
        'Observe.',
        'Question.',
        'Change.',
        'Build again.'
      ],
      conclusion: 'Iteration is how an idea becomes a product.'
    },
    {
      id: 'growth',
      index: '07',
      title: 'GROWTH',
      lead: [
        'Growth is not only about scale.',
        'It is also about understanding.'
      ],
      aspects: [
        'A better question.',
        'A better system.',
        'A better prototype.',
        'A better decision.',
        'A better explanation.',
        'A better version than the one before.'
      ],
      conclusion: 'That is progress.'
    },
    {
      id: 'our-principle',
      index: '08',
      title: 'OUR PRINCIPLE',
      statement: 'START BEFORE YOU FEEL READY.',
      subtext: 'Then let the work teach you what comes next.'
    }
  ]
};

export const CHAPTER_04_CONTENT = {
  id: '04',
  numberLabel: 'CHAPTER 04',
  title: 'BUILD IN PUBLIC',
  subtitle: 'The process is part of the product. Don\'t just show what worked. Show what you learned.',
  sections: [
    {
      id: 'process-is-product',
      index: '01',
      title: 'THE PROCESS IS PART OF THE PRODUCT',
      lead: 'Building in public means sharing the process while it is still happening.',
      exclusions: [
        'Not only the finished work.',
        'Not only the successful experiments.',
        'Not only the moments worth celebrating.'
      ],
      elements: [
        'The process.',
        'The research.',
        'The prototypes.',
        'The decisions.',
        'The failures.',
        'The iterations.',
        'The lessons.'
      ],
      closing: 'DAY ZERO is built around this approach.'
    },
    {
      id: 'why-document',
      index: '02',
      title: 'WHY DOCUMENT THE PROCESS?',
      lead: [
        'Documentation creates a record.',
        'Without it, decisions disappear into memory.'
      ],
      disappearances: [
        'A prototype gets replaced.',
        'A rejected idea gets forgotten.',
        'A technical problem gets solved and its context disappears.',
        'A lesson is learned but never written down.'
      ],
      callout: [
        'Documentation gives those moments somewhere to live.',
        'It creates a record that can be revisited, understood and shared.'
      ]
    },
    {
      id: 'not-performing',
      index: '03',
      title: 'BUILDING IN PUBLIC IS NOT PERFORMING',
      opening: [
        'There is a difference between documenting work and creating content about work.',
        'DAY ZERO is interested in the former.'
      ],
      antiHype: [
        'The goal is not to make every moment look exciting.',
        'The goal is not to manufacture progress.',
        'The goal is to show what actually happened.'
      ],
      rules: [
        'If an experiment fails, the record should say it failed.',
        'If an assumption changes, the record should show why.',
        'If a prototype gets abandoned, that decision is part of the story.'
      ],
      conclusion: 'Honest documentation is more useful than polished performance.'
    },
    {
      id: 'build-loop',
      index: '04',
      title: 'THE DAY ZERO BUILD LOOP',
      stages: [
        {
          num: '01',
          name: 'RESEARCH',
          points: [
            'Understand the problem.',
            'Find what is already known.',
            'Identify assumptions.',
            'Ask better questions.'
          ]
        },
        {
          num: '02',
          name: 'PROTOTYPE',
          points: [
            'Turn an idea into something tangible.',
            'It doesn\'t need to be perfect.',
            'It needs to be testable.'
          ]
        },
        {
          num: '03',
          name: 'TEST',
          points: [
            'Put the assumption under pressure.',
            'Observe what happens.',
            'Look for evidence.'
          ]
        },
        {
          num: '04',
          name: 'ITERATE',
          points: [
            'Keep what works.',
            'Change what doesn\'t.',
            'Remove what isn\'t necessary.'
          ]
        },
        {
          num: '05',
          name: 'DOCUMENT',
          points: [
            'Record what happened.',
            'What changed?',
            'Why did it change?',
            'What did we learn?'
          ]
        },
        {
          num: '06',
          name: 'SHARE',
          points: [
            'Make the useful parts accessible to others.',
            'Then begin again.'
          ]
        }
      ]
    },
    {
      id: 'what-we-share',
      index: '05',
      title: 'WHAT WE SHARE',
      lead: 'DAY ZERO can become a record of:',
      items: [
        'Product experiments',
        'Engineering projects',
        'Prototype development',
        'Research',
        'Technical decisions',
        'Design iterations',
        'Failed approaches',
        'Build logs',
        'Lessons learned',
        'Product development case studies'
      ],
      principle: [
        'The work comes first.',
        'The documentation follows the work.'
      ]
    },
    {
      id: 'why-it-matters',
      index: '06',
      title: 'WHY IT MATTERS',
      opening: 'Someone else is always standing at their own beginning.',
      impacts: [
        'If they can see the unfinished work, they can understand that uncertainty is normal.',
        'If they can see the failed experiment, they can learn from it.',
        'If they can see the iteration, they can understand the process.',
        'And if they can see someone start, perhaps they will start too.'
      ]
    },
    {
      id: 'the-day-zero-rule',
      index: '07',
      title: 'THE DAY ZERO RULE',
      statement: 'DON\'T JUST SHOW WHAT WORKED.',
      punchline: 'SHOW WHAT YOU LEARNED.'
    }
  ]
};

export const CHAPTER_05_CONTENT = {
  id: '05',
  numberLabel: 'CHAPTER 05',
  title: 'CURRENT MISSIONS',
  subtitle: 'The work is happening now. No invented metrics. No artificial progress. Just the work.',
  sections: [
    {
      id: 'work-is-happening-now',
      index: '01',
      title: 'THE WORK IS HAPPENING NOW',
      opening: [
        'DAY ZERO is not a retrospective project.',
        'It is an ongoing system for building.',
        'The current missions are the products, engineering projects, experiments and ideas moving through that system.'
      ],
      possibilities: [
        'Some will become products.',
        'Some will remain experiments.',
        'Some will change direction.',
        'Some may be abandoned.'
      ],
      closing: 'That is part of the process.'
    },
    {
      id: 'starts-with-a-problem',
      index: '02',
      title: 'EVERY MISSION STARTS WITH A PROBLEM',
      lead: 'Before there is a roadmap, there should be a reason to build.',
      questions: [
        'What problem are we exploring?',
        'Who experiences it?',
        'Why does it matter?',
        'What do we currently believe?',
        'What don\'t we know?'
      ],
      resolution: [
        'The first objective isn\'t to build everything.',
        'It is to understand enough to make the next useful decision.'
      ]
    },
    {
      id: 'from-idea-to-mission',
      index: '03',
      title: 'FROM IDEA TO MISSION',
      lead: 'A DAY ZERO mission can move through several states:',
      states: [
        { name: 'QUESTION', desc: 'Something is worth exploring.' },
        { name: 'RESEARCH', desc: 'We investigate the problem and existing possibilities.' },
        { name: 'PROTOTYPE', desc: 'We create an early version that can be tested.' },
        { name: 'EXPERIMENT', desc: 'We test an assumption.' },
        { name: 'ITERATION', desc: 'We change the system based on evidence.' },
        { name: 'PRODUCT', desc: 'An idea becomes something people can actually use.' }
      ],
      callout: [
        'These states are not necessarily linear.',
        'A mission can move backwards.',
        'A prototype can return to research.',
        'A product can become an experiment again.',
        'That is normal.'
      ]
    },
    {
      id: 'what-counts-as-progress',
      index: '04',
      title: 'WHAT COUNTS AS PROGRESS?',
      lead: 'Progress isn\'t only shipping.',
      intro: 'Progress can be:',
      items: [
        'Discovering that an assumption was wrong.',
        'Removing an unnecessary feature.',
        'Finding a simpler technical approach.',
        'Understanding a user\'s problem better.',
        'Building a prototype that answers an important question.',
        'Documenting a lesson that prevents the same mistake later.'
      ],
      conclusion: 'Progress is better information.'
    },
    {
      id: 'the-mission-log',
      index: '05',
      title: 'THE MISSION LOG',
      lead: 'Every active project should eventually have a visible record.',
      schema: [
        { field: 'MISSION', prompt: 'What are we building?' },
        { field: 'PROBLEM', prompt: 'What are we trying to solve?' },
        { field: 'CURRENT STATE', prompt: 'Where is the project now?' },
        { field: 'LATEST ITERATION', prompt: 'What changed?' },
        { field: 'NEXT STEP', prompt: 'What are we testing or building next?' },
        { field: 'LESSONS', prompt: 'What have we learned so far?' }
      ],
      takeaway: 'This is where the abstract idea of "building in public" becomes real.'
    },
    {
      id: 'current-missions-manifesto',
      index: '06',
      title: 'CURRENT MISSIONS',
      lead: 'This section should eventually contain the actual DAY ZERO projects.',
      intro: 'For every mission, visitors should be able to discover:',
      discoveries: [
        'WHAT IT IS',
        'WHY IT EXISTS',
        'HOW IT IS BEING BUILT',
        'WHAT HAS BEEN LEARNED',
        'WHAT HAPPENS NEXT'
      ],
      creed: [
        'No invented metrics.',
        'No artificial progress.',
        'Just the work.'
      ]
    }
  ]
};

export const CHAPTER_06_CONTENT = {
  id: '06',
  numberLabel: 'CHAPTER 06',
  title: 'FUTURE ECOSYSTEM',
  subtitle: 'More than a website. An ecosystem built around creating, learning and documenting.',
  sections: [
    {
      id: 'more-than-a-website',
      index: '01',
      title: 'MORE THAN A WEBSITE',
      opening: [
        'DAY ZERO starts with a website.',
        'It isn\'t intended to end there.',
        'The long-term vision is an ecosystem built around creating, learning and documenting.'
      ],
      pillars: [
        'Products.',
        'Engineering projects.',
        'Knowledge.',
        'Documentation.',
        'Media.',
        'Community.'
      ],
      closing: 'Each new project should contribute something to the larger system.'
    },
    {
      id: 'the-product-layer',
      index: '02',
      title: 'THE PRODUCT LAYER',
      lead: [
        'The foundation is real work.',
        'DAY ZERO should grow through a portfolio of products and experiments rather than through ideas alone.'
      ],
      truths: [
        'Every product becomes an opportunity to learn.',
        'Every project creates documentation.',
        'Every iteration adds another piece to the record.'
      ]
    },
    {
      id: 'the-knowledge-layer',
      index: '03',
      title: 'THE KNOWLEDGE LAYER',
      lead: 'The lessons created while building should not disappear when a project moves on.',
      intro: 'They can become:',
      assets: [
        'Engineering case studies',
        'Product development notes',
        'Technical documentation',
        'Research',
        'Experiments',
        'Build logs',
        'Lessons learned',
        'Practical resources'
      ],
      conclusion: 'This turns individual projects into reusable knowledge.'
    },
    {
      id: 'the-documentation-layer',
      index: '04',
      title: 'THE DOCUMENTATION LAYER',
      lead: [
        'Documentation creates continuity.',
        'A project shouldn\'t simply appear one day as a finished product.',
        'There should be a trail.'
      ],
      trail: [
        'The problem.',
        'The first idea.',
        'The research.',
        'The prototype.',
        'The failures.',
        'The iterations.',
        'The decisions.',
        'The result.'
      ],
      closing: 'That trail becomes part of the DAY ZERO archive.'
    },
    {
      id: 'the-community-layer',
      index: '05',
      title: 'THE COMMUNITY LAYER',
      lead: 'The ecosystem should also create a place for other builders.',
      types: [
        'People who are starting.',
        'People who are experimenting.',
        'People who are learning.',
        'People who have failed and want to try again.'
      ],
      mission: [
        'The goal isn\'t to create an audience that watches from the outside.',
        'It is to encourage more people to build.'
      ]
    },
    {
      id: 'the-media-layer',
      index: '06',
      title: 'THE MEDIA LAYER',
      lead: 'Some parts of building are better understood visually.',
      forms: [
        'A product documentary.',
        'A technical walkthrough.',
        'A prototype demonstration.',
        'A conversation.',
        'A build log.',
        'A behind-the-scenes record.'
      ],
      closing: 'DAY ZERO can use different forms of media to document the same underlying journey.'
    },
    {
      id: 'the-knowledge-loop',
      index: '07',
      title: 'THE KNOWLEDGE LOOP',
      steps: [
        'PRODUCT',
        'EXPERIMENT',
        'DOCUMENTATION',
        'LEARNING',
        'KNOWLEDGE',
        'NEW PROJECT',
        'PRODUCT'
      ],
      closing: 'The ecosystem grows through this loop.'
    },
    {
      id: 'the-long-term-idea',
      index: '08',
      title: 'THE LONG-TERM IDEA',
      layers: [
        'The website is the foundation.',
        'The products are the work.',
        'The documentation is the record.',
        'The knowledge is what remains useful.',
        'And the ecosystem is what connects everything together.'
      ]
    }
  ]
};

export const CHAPTER_07_CONTENT = {
  id: '07',
  numberLabel: 'CHAPTER 07',
  title: 'MANIFESTO',
  subtitle: 'We choose to begin before everything is figured out. This is DAY ZERO.',
  sections: [
    {
      id: 'this-is-day-zero',
      index: '01',
      title: 'THIS IS DAY ZERO',
      choices: [
        'We choose to begin before everything is figured out.',
        'We choose to build instead of waiting.',
        'We choose to learn by doing.',
        'We choose to document the process instead of hiding the unfinished parts.',
        'We choose honesty over performance.',
        'We choose evidence over assumptions.',
        'We choose iteration over perfection.',
        'We choose progress over appearances.',
      ],
      closing: 'And when something doesn\'t work, we choose to learn from it.'
    },
    {
      id: 'we-build',
      index: '02',
      title: 'WE BUILD',
      paragraphs: [
        'Ideas are only potential.',
        'Building gives them form.',
        'A prototype gives an idea something to react to.',
        'A product gives it a place in the world.'
      ],
      creed: 'We build because understanding comes from making.'
    },
    {
      id: 'we-document',
      index: '03',
      title: 'WE DOCUMENT',
      lead: 'The work shouldn\'t disappear once the result exists.',
      items: [
        'We document decisions.',
        'We document experiments.',
        'We document failures.',
        'We document iterations.',
        'We document what we learn.'
      ],
      closing: 'Because the process can be useful to someone else.'
    },
    {
      id: 'we-learn',
      index: '04',
      title: 'WE LEARN',
      lead: [
        'We don\'t expect to know everything before we begin.',
        'We expect the work to teach us.'
      ],
      effects: [
        'Every experiment produces information.',
        'Every iteration changes our understanding.',
        'Every project leaves something behind.'
      ],
      closing: 'Knowledge is built through the process.'
    },
    {
      id: 'we-iterate',
      index: '05',
      title: 'WE ITERATE',
      lead: [
        'The first version is rarely the final version.',
        'That\'s not failure.',
        'That\'s development.'
      ],
      action: 'We improve by observing, questioning, testing and rebuilding.',
      goals: [
        'The goal isn\'t to get everything right immediately.',
        'The goal is to make the next version better.'
      ]
    },
    {
      id: 'we-share',
      index: '06',
      title: 'WE SHARE',
      lead: [
        'Building in public creates accountability.',
        'It also creates possibility.'
      ],
      beneficiaries: [
        'Someone can learn from the experiment.',
        'Someone can avoid the mistake.',
        'Someone can understand the decision.',
        'Someone can see that the beginning doesn\'t have to be perfect.'
      ],
      closing: 'Sharing the process makes the work bigger than the product itself.'
    },
    {
      id: 'we-begin-again',
      index: '07',
      title: 'WE BEGIN AGAIN',
      lead: 'There is no final version of the journey.',
      chain: [
        'One project leads to another.',
        'One lesson creates another question.',
        'One answer reveals another problem worth exploring.'
      ],
      closing: [
        'The process continues.',
        'So does DAY ZERO.'
      ]
    },
    {
      id: 'the-day-zero-manifesto',
      index: '08',
      title: 'THE DAY ZERO MANIFESTO',
      tenets: [
        'START BEFORE READY.',
        'BUILD IN PUBLIC.',
        'BE HONEST.',
        'LEARN BY BUILDING.',
        'DOCUMENT THE PROCESS.',
        'ITERATE WITHOUT EGO.',
        'SHARE WHAT YOU LEARN.',
        'KEEP MOVING.',
        'NEVER STOP BEGINNING.'
      ]
    },
    {
      id: 'final-statement',
      index: '09',
      title: 'FINAL STATEMENT',
      opening: [
        'DAY ZERO is not a story about having already made it.',
        'It is a record of what happens while becoming.'
      ],
      becoming: [
        'The first idea.',
        'The first prototype.',
        'The first failure.',
        'The first lesson.',
        'The next iteration.',
        'The next product.',
        'The next question.'
      ],
      closing: [
        'There will always be another beginning.',
        'And every beginning has a Day Zero.'
      ]
    }
  ]
};

export const CHAPTERS_FULL_CONTENT = {
  '01': CHAPTER_01_CONTENT,
  '02': CHAPTER_02_CONTENT,
  '03': CHAPTER_03_CONTENT,
  '04': CHAPTER_04_CONTENT,
  '05': CHAPTER_05_CONTENT,
  '06': CHAPTER_06_CONTENT,
  '07': CHAPTER_07_CONTENT,
};


