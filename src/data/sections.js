import _ from 'lodash';

import FilterGraph from '../FilterGraph';
import PositionGraph from '../PositionGraph';

var paddingTop = 150;
var marginBottom = 600;

function sections(width, vizWidth, sectionWidth) {
  function positionAngelica(data, selectedCharacters, selectedConversation) {
    if (!selectedCharacters.length) {
      selectedCharacters = ['2', '8'];
    }
    if (!selectedConversation.length) {
      selectedConversation = ['2-8', '8-2'];
    }
    var {linePositions, songPositions, characterNodes, characterLinks} =
      FilterGraph.filterForCharacters(data, selectedCharacters, selectedConversation);
    var {linePositions, songPositions} =
      PositionGraph.positionForCharacters(linePositions, songPositions,
        vizWidth, 0, paddingTop / 6);

    return {linePositions, songPositions, characterNodes, characterLinks};
  }

  function positionEliza(data, selectedThemes) {
    if (!selectedThemes.length) {
      selectedThemes = ['10', '18'];
    }
    var {linePositions, songPositions, diamondPositions, groupedThemes} =
      FilterGraph.filterForThemes(data, selectedThemes);
    var {linePositions, songPositions} =
      PositionGraph.positionForAll(linePositions, diamondPositions, songPositions,
        vizWidth, sectionWidth, paddingTop / 6);

    return {linePositions, songPositions, diamondPositions, groupedThemes};
  }

  return [
    {
      id: 'header',
      random: true,
      style: {
        width: '60%',
        marginBottom,
      },
      position(data) {
        _.each(data.lines, line => line.selected = true);
        return PositionGraph.positionLinesAsImage(data.lines, vizWidth, sectionWidth);
      },
      text: `
  <center>
    <h1 style='line-height: 1.25'>
      An Interactive Visualization of<br />
      Every Line in Hamilton
    </h1>
    <sup>BY [SHIRLEY WU](http://twitter.com/sxywu)</sup>
  </center>

  The [hype](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=hamilton%20hype) around [Hamilton](http://www.hamiltonbroadway.com/) is astronomical, so I was understandably doubtful at first.  But from the moment I sat down to listen the whole way through, I was done for.

  I was obsessed.  I had the soundtrack on repeat for months, it was all I listened to in my waking hours.  I listened so much I had favorite lines and favorite songs.  I analyzed the lyrics; I reveled in the layers of complexity, the double entredres, the clever word plays.

  Then my obsession hit a peak and <span class='underline'>I started to wonder what a visualization of Hamilton would look like.</span>

  <center>
    <h3>
      Start<br />
      ↓
    </h3>
  </center>
      `
    },
    {
      id: 'intro1',
      random: true,
      style: {
        margin: 'auto',
        paddingTop,
        marginBottom,
        width: '50%',
      },
      position(data) {
        _.each(data.lines, line => line.selected = true);
        var positions = PositionGraph.positionLinesRandomly(data.lines, width);
        positions.random = true;

        return positions;
      },
      text: `
  When I started, I was curious about two things: the relationships between the primary characters, and the recurring phrases associated with those characters.

  So I've gone through every single line in Hamilton (twice 😱) to record who sang each line, as well as who that line may have been directed towards.  I've noted every phrase that was sung more than once across more than one song, and grouped them into broad themes*.

  I've visualized the lines as circles, colored by singer.  <span class='underline'>Hover any circle</span> to see its lyrics.

  <sup>**Though I am unconscious of intentional error, I am nevertheless too sensible of my defects not to think it probable that I may have committed many errors.*</sup>
      `
    },
    {
      id: 'filter_characters',
      random: true,
      left: sectionWidth,
      style: {
        paddingTop,
        marginBottom,
        minHeight: 600,
      },
      filter: 'characters',
      position(data, selectedCharacters, selectedConversation) {
        // either way, have to reset the colors on everything
        var {linePositions, songPositions, characterNodes, characterLinks} =
          FilterGraph.filterForCharacters(data, selectedCharacters, selectedConversation);

        if (selectedCharacters.length || selectedConversation.length) {
          var {linePositions, songPositions} =
            PositionGraph.positionForCharacters(linePositions, songPositions,
              vizWidth, sectionWidth, paddingTop);

          return {linePositions, songPositions, characterNodes, characterLinks};
        } else {
          var {linePositions} = PositionGraph.positionLinesBySong(data.lines, sectionWidth - 75, paddingTop);
          return {linePositions, characterNodes, characterLinks};
        }
      },
      text: `
  After three days, I had a spectacularly rich dataset of lines, characters, and recurring phrases.  The first thing I did was to explore the lines filtered by characters and their conversations.

  Above are **13** of the **18** primary characters with Hamilton at the center.  They are connected by **arcs** denoting the conversations between them.  <span class='underline'>Select any set of characters and conversations</span> to view their corresponding lines.
      `
    },
    {
      id: 'angelica1',
      consecutive: true,
      style: {
        paddingTop,
        marginLeft: vizWidth,
      },
      filter: 'characters',
      characterHeight: 100,
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(data, selectedCharacters, selectedConversation);
      },
      text: `
  As I filtered by different sets of characters, I started to see the nuances, the stories between each set of characters.  The most widely analyzed relationship is the one between Alexander Hamilton and Aaron Burr, but I want to explore instead the relationship between Alexander and Angelica Schuyler.
      `
    },
    {
      id: 'angelica2',
      consecutive: true,
      style: {
        paddingTop,
        marginLeft: vizWidth,
      },
      clips: [
        ['/music/whenyouregone.mp3', ['8/26:23-27', '2/26:23-27']],
        ['/music/whenyouregone.mp3', ['8/26:85-86', '2/26:85-86']],
      ],
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(data, selectedCharacters, selectedConversation);
      },
      text: `
  ### An Ocean Away

  Angelica Schuyler is Alexander Hamilton's sister-in-law, the one who introduces Alexander to her sister Eliza Schuyler.  Angelica and Alexander's relationship is ambiguously flirtateous from the very start, their exchanges in *Satisfied* puntuated by mutual understanding - that they're both never satisfied.

  This flirtation is amplified in *Take A Break*, the only time in the whole musical they sing together:

  <span class='music' data-char='2' data-clip='0'>
    <span class='control'></span>
    And there you are, an ocean away &nbsp;<br />
    &nbsp; Do you have to live an ocean away? &nbsp;<br />
    &nbsp; Thoughts of you subside &nbsp;<br />
    &nbsp; Then I get another letter &nbsp;<br />
    &nbsp; I cannot put the notion away… &nbsp;<br />
  </span>

  Angelica sings that she's coming home from London for the summer (at Eliza's invitation), and that she just can't wait:

  <span class='music' data-char='8' data-clip='1'>
    <span class='control'></span>
    You won’t be an ocean away &nbsp;<br />
    &nbsp; You will only be a moment away… &nbsp;<br />
  </span>

  And they leave us wondering: did they, or didn't they?
      `
    },
    {
      id: 'angelica3',
      consecutive: true,
      style: {
        paddingTop,
        marginLeft: vizWidth,
      },
      clips: [
        ['/music/whenyouregone.mp3', ['2/37:32-33']],
        ['/music/whenyouregone.mp3', ['8/37:36-43']],
        ['/music/whenyouregone.mp3', ['8/11:92-111']],
      ],
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(data, selectedCharacters, selectedConversation);
      },
      text: `
  ### As Trusting Or As Kind

  The turning point in Angelica and Alexander's relationship comes in *The Reynolds Pamphlet*, after Alexander publishes the details of his affair with Maria Reynolds to save his political reputation.  When Angelica hurries back from London, Alexander is relieved:

  <span class='music' data-char='2' data-clip='0'>
    <span class='control'></span>
    Angelica, thank God &nbsp;<br />
    &nbsp; Someone who understands what I’m struggling here to do &nbsp;<br />
  </span>

  Angelica instead replies:

  <span class='music' data-char='8' data-clip='1'>
    <span class='control'></span>
    &nbsp; I know my sister like I know my own mind &nbsp;<br />
    &nbsp; You will never find anyone as trusting or as kind &nbsp;<br />
    &nbsp; I love my sister more than anything in this life &nbsp;<br />
    &nbsp; I will choose her happiness over mine every time &nbsp;<br />
    &nbsp; Put what we had aside &nbsp;<br />
    &nbsp; I’m standing at her side &nbsp;<br />
    &nbsp; You could never be satisfied &nbsp;<br />
    &nbsp; God, I hope you’re satisfied &nbsp;<br />
  </span>

  And here we see that Angelica has matured; when she first introduces Eliza to Alexander, she does so because she knows Eliza is in love with him.  She believes that Eliza (*you will never find anyone as trusting or as kind*) is a better match for Alexander.  But most of all, she does so for herself, because she knows:
  <span class='music' data-char='8' data-clip='1'><span class='control'></span>He will never be satisfied, I will never be satisfied </span>.

  But after the Reynolds affair, she *puts what they had aside*, and we know that she does this solely for Eliza's sake; she sings only that Alexander could never be satisfied.
      `
    },
    {
      id: 'angelica4',
      consecutive: true,
      random: true,
      style: {
        paddingTop,
        marginBottom,
        marginLeft: vizWidth,
      },
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(data, selectedCharacters, selectedConversation);
      },
      text: `
  ### She Takes His Hand

  *It's Quiet Uptown* is the only song that starts with Angelica, as she and Alexander take turns narrating the aftermath of the Hamiltons losing their eldest son.  Angelica watches over as Alexander tries to get through to an unmoving Eliza, and as they reconcile; it is the most beautifully satisfying close to Angelica and Alexander's story.

  Angelica does not re-appear with Alexander until his death in *The World Was Wide Enough*.
      `
    },
    {
      id: 'eliza1',
      consecutive: true,
      style: {
        paddingTop,
      },
      filter: 'themes',
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes);
      },
      text: `
  When I first started listening to the soundtrack, I adored Angelica for her independence and intelligence (and her rap was *fierce*).  Eliza, on the other hand, was just...there for me.  But the more I listened and the more I dug through Eliza's lines, the more she grew on me; I am now convinced that she - not Alexander - has the most character growth in the musical.
      `
    },
    {
      id: 'eliza2',
      consecutive: true,
      style: {
        paddingTop,
      },
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes);
      },
      clips: [
        ['/music/whenyouregone.mp3', ['7/17:18-45']],
        ['/music/whenyouregone.mp3', ['7/17:18-45']],
      ],
      text: `
  ### Look Around

  Eliza Schuyler is the second daughter of a wealthy New York family; her upbringing has afforded her an innocently idealistic outlook on life.  When she meets Alexander, she lacks Angelica's understanding of Alexander's ambition, and she is helplessly in love.

  That confident optimism is highlighted in *That Would Be Enough*, when Alexander is on leave from the war.  Downtrodden that he may never be given command, he asks Eliza if she'll relish being a poor man's wife.  She responds:

  <span class='music' data-char='7' data-clip='0'>
    <span class='control'></span>
    I relish being your wife &nbsp;<br />
    &nbsp; Look around, look around… &nbsp;<br />
    &nbsp; Look at where you are &nbsp;<br />
    &nbsp; Look at where you started &nbsp;<br />
    &nbsp; The fact that you’re alive is a miracle &nbsp;<br />
    &nbsp; Just stay alive, that would be enough &nbsp;<br />
  </span>

  And she continues:

  <span class='music' data-char='7' data-clip='1'>
    <span class='control'></span>
    We don’t need a legacy &nbsp;<br />
    &nbsp; We don’t need money &nbsp;<br />
    &nbsp; If I could grant you peace of mind &nbsp;<br />
    &nbsp; If you could let me inside your heart… &nbsp;<br />
    &nbsp; Oh, let me be a part of the narrative &nbsp;<br />
    &nbsp; In the story they will write someday &nbsp;<br />
  </span>

  They're newly married with a child on the way, and Eliza knows exactly what she wants from him: not money nor legacy, but for him to stay, and for her to be a part of his story.
      `
    },
    {
      id: 'eliza3',
      consecutive: true,
      style: {
        paddingTop,
      },
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes);
      },
      clips: [
        ['/music/whenyouregone.mp3', ['7/23:122-128']],
        ['/music/whenyouregone.mp3', ['2/23:157']],
      ],
      text: `
  ### They're Asking Me To Lead

  The next time Eliza appears with Alexander is in *Non-Stop* after the war.  Alexander works (non-stop) as a lawyer, is invited to the Constitutional Convention, and writes the majority of the Federalist Papers.  Eliza pleads with him:

  <span class='music' data-char='7' data-clip='0'>
    <span class='control'></span>
    And if your wife could share a fraction of your time &nbsp;<br />
    &nbsp; If I could grant you peace of mind &nbsp;<br />
    &nbsp; Would that be enough? &nbsp;<br />
  </span>

  Eliza's lines are close to the ones she sung to Alexander in *That Would Be Enough*, but the subtle changes make clear two things: Eliza is starting to realize that Alexander will always place his political ambitions before her, and she is left unsure of her own role.

  The most heartbreaking moment comes when George Washington asks Alexander to join his cabinet as Treasury Secretary, and Eliza instead asks Alexander to stay.  Alexander responds with the very lines that Eliza uses to reassure him in *That Would Be Enough*, using them instead as his reason to leave: <span class='music' data-char='2' data-clip='1'><span class='control'></span>Look around, look around at how lucky we are to be alive right now &nbsp;</span>.

  In return, Eliza sings only one word: *helpless*.  *It is the last time she sings* helpless *in the whole musical.*
      `
    },
    {
      id: 'eliza4',
      consecutive: true,
      style: {
        paddingTop,
      },
      clips: [
        ['/music/whenyouregone.mp3', ['2/41:25-40']],
        ['/music/whenyouregone.mp3', ['24/41:56-59']],
      ],
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes);
      },
      text: `
  ### Forgiveness

  When Eliza learns of Alexander's affair with Maria Reynolds, she burns their letters, determined to write herself out of the narrative.  But when their eldest son Philip dies in a duel, she is grief-stricken, mute throughout *It's Quiet Uptown*.

  The song starts with Alexander working through his grief, but as the song progresses Alexander tries to get through to Eliza instead.  He again mirrors Eliza's lines from *That Would Be Enough*, but this time, it is to reassure her that he will stay by her side:

  <span class='music' data-char='2' data-clip='0'>
    <span class='control'></span>
    Look at where we are &nbsp;<br />
    &nbsp; Look at where we started &nbsp;<br />
    &nbsp; I know I don’t deserve you, Eliza &nbsp;<br />
    &nbsp; But hear me out. That would be enough &nbsp;<br />
    &nbsp; If I could spare his life &nbsp;<br />
    &nbsp; If I could trade his life for mine &nbsp;<br />
    &nbsp; He’d be standing here right now &nbsp;<br />
    &nbsp; And you would smile, and that would be enough &nbsp;<br />
  </span>

  There is a moment, and Eliza finally takes his hand and sings only one line: *it's quiet uptown*.  The music swells, and the Company asks:

  <span class='music' data-char='24' data-clip='1'>
    <span class='control'></span>
    Forgiveness.  Can you imagine? &nbsp;<br />
    &nbsp; Forgiveness.  Can you imagine? &nbsp;<br />
    &nbsp; If you see him in the street, walking by her side, talking by her side, have pity &nbsp;<br />
    &nbsp; They are going through the unimaginable &nbsp;<br />
  </span>

  And it's heartbreakingly beautiful as they reconcile, and their story comes around full circle: *Alexander finally puts Eliza first, and he promises to stay*.
      `
    },
    {
      id: 'eliza5',
      consecutive: true,
      random: true,
      style: {
        paddingTop,
        marginBottom,
      },
      clips: [
        ['/music/whenyouregone.mp3', ['7/46:70-74']],
      ],
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes);
      },
      text: `
  ### Will They Tell My Story?

  At the beginning of their Marriage, Eliza tells Alexander that if he could just stay by her side, that would be enough.  As their marriage progresses and she realizes the extent of his ambition, Eliza starts to doubt herself, asking Alexander what would be enough - if she could be enough.  But as they face the hardest of trials - an affair and the death of a child - their relationship reverses, and Alexander asks if he could stay by her side, that would be enough.

  As the musical closes with *Who Lives, Who Dies, Who Tells Your Story*, Eliza comes into her own; after Alexander's death, she puts herself back in the narrative.  She tells his story, his fellow soldiers' stories, Washington's story.  She builds the first private orphanage in New York City - her proudest accomplishment.  And when her time is up, she asks:

  <span class='music' data-char='7' data-clip='0'>
    <span class='control'></span>
    Have *I* done enough? &nbsp;<br />
    &nbsp; Will they tell *my* story? &nbsp;<br />
  </span>

  That subtle change in wording is amazing; Eliza is no longer concerned about *what would be enough*, but rather if *she* has *done* enough.  She is responsible for her own wants, her own purpose, her own legacy.  She is no longer a secondary character in her husband's story, but *the main character of her own*.
      `
    },
    {
      id: 'conclusion',
      style: {
        paddingTop,
      },
      filter: 'all',
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        var {linePositions, diamondPositions, songPositions, groupedThemes, characterNodes, characterLinks} =
          FilterGraph.filterForAll(data, selectedCharacters, selectedConversation, selectedThemes);

        if (selectedCharacters.length || selectedConversation.length || selectedThemes.length) {
          var {linePositions, songPositions} =
            PositionGraph.positionForAll(linePositions, diamondPositions, songPositions,
              vizWidth, sectionWidth, paddingTop);

          return {linePositions, songPositions, diamondPositions, groupedThemes, characterNodes, characterLinks};
        } else {
          var {linePositions} = PositionGraph.positionLinesBySong(data.lines, sectionWidth - 75, paddingTop);
          return {linePositions, diamondPositions: [], groupedThemes, characterNodes, characterLinks};
        }
      },
      text: `
  Angelica and Eliza are only two of the stories I've found; there are many more.  Filter by any combination of characters, conversations, and themes below to explore more stories.
      `
    },
  ];
}

export default sections;
