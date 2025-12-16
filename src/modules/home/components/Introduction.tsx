const Introduction = () => {
  return (
    <section className='bg-cover bg-no-repeat '>
      <div className='space-y-3'>
        <div className='flex gap-2  text-2xl font-medium lg:text-3xl'>
          <h1>Hi, I&apos;m Kyle Dominic</h1>{' '}
          <div className='ml-1 animate-waving-hand'>👋</div>
        </div>
        <div className='space-y-4'>
          <ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
            <li>
              Based in Manila, Philippines <span className='ml-1'>🇮🇩</span>
            </li>
            <li>Working remotely</li>
          </ul>
        </div>
      </div>

      <p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
        Experienced Frontend Developer with hands-on experience building and
        enhancing web and desktop applications. I specialize in crafting
        efficient, scalable, and user-friendly interfaces. I work with
        JavaScript and specialize in all-things web. I thrive on collaborating
        with teams to deliver polished, production-ready features and visually
        appealing web applications.
      </p>
    </section>
  );
};

export default Introduction;
