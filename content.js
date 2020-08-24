const interval = 500;
const timer = setInterval(() => {
  const noWorkspacesIndicator = document.querySelector('h3.jss220.jss227');
  /*
   * The user has no workspaces.
   */
  if(noWorkspacesIndicator !== null) {
    // console.log('[Gitpod-Window]: Cannot find any workspaces');
    clearInterval(timer);
  }
  /*
   * Query all buttons with "Open" or "Start"
   * to set target to _self instead of _blank.
   */
  const nodes = document.querySelectorAll('a.jss287.jss290.jss298.jss300.button');
  if (nodes.length !== 0) {
    // console.log(`[Gitpod-Window]: Find ${nodes.length} workspaces`);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].target = '_self';
    }
    clearInterval(timer);
  }
}, interval);
