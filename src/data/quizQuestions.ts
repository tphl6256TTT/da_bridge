interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizQuestions: Record<number, Question[]> = {
  // World 1: Bridge Basics
  1: [
    {
      id: 1,
      question: "How many cards are in a standard deck of bridge cards?",
      options: ["48", "52", "56", "60"],
      correctAnswer: 1,
      explanation: "A standard bridge deck contains 52 cards, divided into 4 suits of 13 cards each."
    },
    {
      id: 2,
      question: "Which suit ranks highest in bridge?",
      options: ["Clubs", "Diamonds", "Hearts", "Spades"],
      correctAnswer: 3,
      explanation: "Spades is the highest-ranking suit in bridge, followed by Hearts, Diamonds, and Clubs."
    },
    {
      id: 3,
      question: "How many players are needed for a game of bridge?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "Bridge is played with exactly 4 players, forming two partnerships."
    },
    {
      id: 4,
      question: "What is the minimum number of tricks needed to make a 3NT contract?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 2,
      explanation: "A 3NT contract requires 9 tricks (6 + 3) to make."
    },
    {
      id: 5,
      question: "How many high card points (HCP) does an Ace count as?",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
      explanation: "An Ace is worth 4 high card points in the standard 4-3-2-1 point count system."
    },
    {
      id: 6,
      question: "How many tricks are there in total in one hand of bridge?",
      options: ["11", "12", "13", "14"],
      correctAnswer: 2,
      explanation: "There are exactly 13 tricks in a hand of bridge, as each player starts with 13 cards."
    },
    {
      id: 7,
      question: "What is trump in bridge?",
      options: ["The highest card", "The suit bid in the contract", "Always Spades", "The first card played"],
      correctAnswer: 1,
      explanation: "Trump is the suit named in the final contract, which beats all cards of other suits."
    },
    {
      id: 8,
      question: "How many HCP are there in a complete deck?",
      options: ["36", "40", "44", "48"],
      correctAnswer: 1,
      explanation: "There are 40 HCP total: 4 Aces (16) + 4 Kings (12) + 4 Queens (8) + 4 Jacks (4) = 40."
    },
    {
      id: 9,
      question: "What does NT stand for in bridge?",
      options: ["New Trump", "No Trump", "Next Turn", "North Team"],
      correctAnswer: 1,
      explanation: "NT stands for No Trump, meaning no suit is trump and the highest card of the led suit wins."
    },
    {
      id: 10,
      question: "Who makes the first lead in bridge?",
      options: ["Declarer", "Dummy", "Left of declarer", "Highest bidder"],
      correctAnswer: 2,
      explanation: "The player to the left of the declarer makes the opening lead."
    }
  ],

  // World 2: Opening Bids
  2: [
    {
      id: 1,
      question: "What is the minimum HCP typically needed to open 1NT?",
      options: ["12-14", "15-17", "18-19", "20-21"],
      correctAnswer: 1,
      explanation: "A standard 1NT opening shows 15-17 HCP with balanced distribution."
    },
    {
      id: 2,
      question: "What is the minimum HCP needed to open the bidding at the one level?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "Generally, 12 HCP is the minimum to open the bidding, though some hands with 11 HCP and good distribution may open."
    },
    {
      id: 3,
      question: "What distribution is considered balanced?",
      options: ["4-3-3-3", "5-3-3-2", "4-4-3-2", "All of these"],
      correctAnswer: 3,
      explanation: "Balanced hands include 4-3-3-3, 4-4-3-2, and 5-3-3-2 distributions with no singleton or void."
    },
    {
      id: 4,
      question: "With 5 spades and 5 hearts, which suit should you open?",
      options: ["Spades", "Hearts", "1NT", "Either one"],
      correctAnswer: 0,
      explanation: "With 5-5 in the majors, open the higher-ranking suit (Spades) first."
    },
    {
      id: 5,
      question: "What does a 2NT opening bid typically show?",
      options: ["15-17 HCP", "18-19 HCP", "20-21 HCP", "22-24 HCP"],
      correctAnswer: 2,
      explanation: "A 2NT opening shows 20-21 HCP with a balanced hand."
    },
    {
      id: 6,
      question: "What is a pre-emptive bid?",
      options: ["Opening 1NT", "A weak bid at high level", "Doubling opponent", "Bidding game directly"],
      correctAnswer: 1,
      explanation: "A pre-emptive bid is a weak hand bid at a high level to interfere with opponents' bidding."
    },
    {
      id: 7,
      question: "With 6 clubs and 5 diamonds, which suit do you open?",
      options: ["Clubs", "Diamonds", "1NT", "Pass"],
      correctAnswer: 0,
      explanation: "Always open your longest suit. With 6-5, bid the 6-card suit first."
    },
    {
      id: 8,
      question: "What is the Rule of 20?",
      options: ["Need 20 HCP to open", "HCP + length of 2 longest suits ≥ 20", "Bid to 20 points", "Open with 20 cards"],
      correctAnswer: 1,
      explanation: "The Rule of 20: Add your HCP to the lengths of your two longest suits. If ≥20, you can open."
    },
    {
      id: 9,
      question: "What does opening 1♣ promise?",
      options: ["Exactly 5 clubs", "At least 3 clubs", "Best suit is clubs", "Strong hand"],
      correctAnswer: 1,
      explanation: "1♣ can be opened with as few as 3 clubs when you have 4-4-3-2 distribution."
    },
    {
      id: 10,
      question: "What is a strong 2♣ opening?",
      options: ["6+ clubs", "22+ HCP artificial bid", "Pre-empt in clubs", "Weak two bid"],
      correctAnswer: 1,
      explanation: "2♣ is artificial and shows 22+ HCP or game-forcing hand, not necessarily clubs."
    }
  ],

  // World 3: Responding to Opening Bids
  3: [
    {
      id: 1,
      question: "What is the minimum HCP needed to respond to partner's 1-level opening?",
      options: ["4", "6", "8", "10"],
      correctAnswer: 1,
      explanation: "You need at least 6 HCP to respond to partner's opening bid."
    },
    {
      id: 2,
      question: "Partner opens 1♥. You have 4 spades and 3 hearts with 8 HCP. What do you bid?",
      options: ["1♠", "2♥", "Pass", "1NT"],
      correctAnswer: 0,
      explanation: "With 6+ HCP and a 4-card spade suit, bid your suit up the line (1♠)."
    },
    {
      id: 3,
      question: "What does a jump raise (1♥-3♥) show?",
      options: ["4+ hearts, 6-9 HCP", "4+ hearts, 10-12 HCP", "5+ hearts, 13+ HCP", "3 hearts, any strength"],
      correctAnswer: 1,
      explanation: "A jump raise shows 4-card support and 10-12 HCP (limit raise)."
    },
    {
      id: 4,
      question: "Partner opens 1NT (15-17). You have 10 HCP balanced. What do you bid?",
      options: ["Pass", "2NT", "3NT", "2♣"],
      correctAnswer: 1,
      explanation: "With 10 HCP opposite 15-17, invite game with 2NT (total 25-27 points)."
    },
    {
      id: 5,
      question: "What is Jacoby Transfer?",
      options: ["Bidding opponent's suit", "2♦/2♥ over 1NT to show major", "Any jump bid", "Pass and defend"],
      correctAnswer: 1,
      explanation: "Jacoby Transfer: 2♦ shows 5+ hearts, 2♥ shows 5+ spades after 1NT opening."
    },
    {
      id: 6,
      question: "Partner opens 1♣. You have 13+ HCP. What type of response is this?",
      options: ["Minimum", "Invitational", "Game-forcing", "Pre-emptive"],
      correctAnswer: 2,
      explanation: "With 13+ HCP opposite an opening bid, you have enough for game (game-forcing)."
    },
    {
      id: 7,
      question: "What does 1NT response to a major opening typically show?",
      options: ["15-17 HCP", "6-10 HCP, no support", "Game-forcing", "4-card support"],
      correctAnswer: 1,
      explanation: "1NT response shows 6-10 HCP without support for partner's major or a biddable suit."
    },
    {
      id: 8,
      question: "Partner opens 1♥. You have ♠AQJ10. What do you respond?",
      options: ["1♠", "2♠", "1NT", "Pass"],
      correctAnswer: 0,
      explanation: "With a good 4-card spade suit, bid it at the 1-level (1♠)."
    },
    {
      id: 9,
      question: "What is a negative double?",
      options: ["Penalty double", "Shows shortage", "Takeout after opponent overcalls", "Strong hand double"],
      correctAnswer: 2,
      explanation: "A negative double after an overcall shows values and typically the unbid major(s)."
    },
    {
      id: 10,
      question: "Partner opens 1NT. You have 8 HCP and 5-4 in majors. What do you bid?",
      options: ["Pass", "2♥", "2♦ (transfer)", "3NT"],
      correctAnswer: 2,
      explanation: "Use Jacoby Transfer (2♦) to show your 5-card heart suit."
    }
  ],

  // World 4: Card Play Fundamentals
  4: [
    {
      id: 1,
      question: "What is a finesse?",
      options: ["Leading a high card", "Attempting to win with a lower honor", "Trumping opponent's ace", "Drawing trumps"],
      correctAnswer: 1,
      explanation: "A finesse is attempting to win a trick with a lower honor when the higher honor is missing."
    },
    {
      id: 2,
      question: "You hold AK3 opposite 542. How many tricks can you guarantee?",
      options: ["1", "2", "3", "0"],
      correctAnswer: 1,
      explanation: "You can guarantee 2 tricks with the Ace and King."
    },
    {
      id: 3,
      question: "What does 'drawing trumps' mean?",
      options: ["Playing trump cards", "Leading high cards", "Removing opponents' trumps", "Counting HCP"],
      correctAnswer: 2,
      explanation: "Drawing trumps means playing trump cards to remove the opponents' trumps."
    },
    {
      id: 4,
      question: "When should you NOT draw trumps immediately?",
      options: ["Never", "When you need ruffs", "Always draw trumps", "When in NT"],
      correctAnswer: 1,
      explanation: "Don't draw trumps if you need to use dummy's trumps for ruffing losers."
    },
    {
      id: 5,
      question: "What is a ruff?",
      options: ["High card play", "Trumping when void", "Discarding loser", "Finessing king"],
      correctAnswer: 1,
      explanation: "A ruff is playing a trump card when you're void in the suit led."
    },
    {
      id: 6,
      question: "What is 'second hand low'?",
      options: ["Bid low second", "Play low in 2nd position", "Always trump", "Lead small cards"],
      correctAnswer: 1,
      explanation: "'Second hand low' means when you're second to play, usually play a low card."
    },
    {
      id: 7,
      question: "What is 'third hand high'?",
      options: ["Bid high third", "Play high in 3rd position", "Never trump", "Discard high cards"],
      correctAnswer: 1,
      explanation: "'Third hand high' means when you're third to play, play your highest card (if partner led)."
    },
    {
      id: 8,
      question: "You have KQJ in your hand. Which card should you lead?",
      options: ["King", "Queen", "Jack", "Any of them"],
      correctAnswer: 0,
      explanation: "From a sequence (KQJ), lead the top card (King)."
    },
    {
      id: 9,
      question: "What is an overtrick?",
      options: ["Extra card", "Trick beyond contract", "Trump trick", "Losing trick"],
      correctAnswer: 1,
      explanation: "An overtrick is a trick won beyond what's needed to make your contract."
    },
    {
      id: 10,
      question: "What is a loser?",
      options: ["Bad hand", "Trick you expect to lose", "Opponent", "Trump card"],
      correctAnswer: 1,
      explanation: "A loser is a trick you expect to lose based on high card strength."
    }
  ],

  // World 5: Defensive Play
  5: [
    {
      id: 1,
      question: "Against NT, what should you lead from KQ1054?",
      options: ["King", "Queen", "10", "4"],
      correctAnswer: 0,
      explanation: "Lead the King from a sequence headed by KQ."
    },
    {
      id: 2,
      question: "What is 'fourth best' lead?",
      options: ["4th card from top", "4th suit bid", "Best 4 cards", "4th round lead"],
      correctAnswer: 0,
      explanation: "Fourth best is leading your 4th highest card from your longest and strongest suit."
    },
    {
      id: 3,
      question: "Partner leads the ♥2. Dummy has ♥Q76. You have ♥AJ3. Which card do you play?",
      options: ["Ace", "Jack", "3", "Either A or J"],
      correctAnswer: 1,
      explanation: "Play the Jack (finesse against dummy's Queen). Partner's ♥2 shows an honor."
    },
    {
      id: 4,
      question: "What does an opening lead of the Ace usually show in a suit contract?",
      options: ["AK or AKQ", "Singleton Ace", "Long suit", "Weak hand"],
      correctAnswer: 0,
      explanation: "Ace lead typically shows AK (or AKQ), asking partner to give count or attitude."
    },
    {
      id: 5,
      question: "What is a count signal?",
      options: ["Counting tricks", "Showing even/odd cards", "Pointing at cards", "Bidding strength"],
      correctAnswer: 1,
      explanation: "Count signal: high card shows even number, low card shows odd number in that suit."
    },
    {
      id: 6,
      question: "When should you give partner a ruff?",
      options: ["Never", "When you're void and have trump", "Always", "In NT only"],
      correctAnswer: 1,
      explanation: "Give a ruff when you're void in a suit and partner can trump it."
    },
    {
      id: 7,
      question: "What is attitude signal?",
      options: ["Your mood", "Showing like/dislike for suit", "Trump signal", "Bid strength"],
      correctAnswer: 1,
      explanation: "Attitude: high card encourages continuation, low card discourages."
    },
    {
      id: 8,
      question: "What does 'covering an honor' mean?",
      options: ["Hiding cards", "Playing higher honor", "Trumping honor", "Discarding honor"],
      correctAnswer: 1,
      explanation: "Cover an honor with a higher honor to potentially promote partner's cards."
    },
    {
      id: 9,
      question: "Against 3NT, what's usually the best opening lead?",
      options: ["Ace", "Trump", "4th best from longest/strongest", "Singleton"],
      correctAnswer: 2,
      explanation: "Against NT, lead 4th best from your longest and strongest suit."
    },
    {
      id: 10,
      question: "What is a Bath Coup?",
      options: ["Playing in water", "Ducking when holding AJ", "Trump play", "Bidding convention"],
      correctAnswer: 1,
      explanation: "Bath Coup: Ducking when holding AJx(x) over the King to trap it later."
    }
  ],

  // World 6: Advanced Bidding
  6: [
    {
      id: 1,
      question: "What is a cue bid?",
      options: ["Bidding with Q", "Showing control/shortage", "Any suit bid", "NT bid"],
      correctAnswer: 1,
      explanation: "A cue bid shows first-round control (Ace or void) in slam bidding."
    },
    {
      id: 2,
      question: "What is Blackwood?",
      options: ["Tree type", "Asking for Aces", "Defense signal", "Opening bid"],
      correctAnswer: 1,
      explanation: "Blackwood (4NT) asks partner how many Aces they hold for slam purposes."
    },
    {
      id: 3,
      question: "What does 4NT response to Blackwood with 1 Ace?",
      options: ["5♣", "5♦", "5♥", "5♠"],
      correctAnswer: 1,
      explanation: "Responses: 5♣=0/4 Aces, 5♦=1, 5♥=2, 5♠=3 Aces."
    },
    {
      id: 4,
      question: "What is Stayman?",
      options: ["2♣ asking for 4-card major", "Strong bid", "Opening", "Trump signal"],
      correctAnswer: 0,
      explanation: "Stayman: 2♣ over 1NT asks if opener has a 4-card major."
    },
    {
      id: 5,
      question: "What is splinter bid?",
      options: ["Dividing points", "Jump showing shortage + support", "Weak bid", "Pass"],
      correctAnswer: 1,
      explanation: "Splinter: unusual jump showing support for partner's suit and shortage in bid suit."
    },
    {
      id: 6,
      question: "What HCP needed for small slam?",
      options: ["26", "28", "30", "33"],
      correctAnswer: 2,
      explanation: "Generally need 33 combined points for small slam (6-level)."
    },
    {
      id: 7,
      question: "What is Roman Key Card Blackwood (RKCB)?",
      options: ["Italian convention", "Asking for aces + trump K", "Opening bid", "Defense"],
      correctAnswer: 1,
      explanation: "RKCB treats the trump King as a 5th 'Ace' when asking for key cards."
    },
    {
      id: 8,
      question: "What is Fourth Suit Forcing?",
      options: ["4th player bids", "Artificial forcing bid", "Trump suit", "Pass"],
      correctAnswer: 1,
      explanation: "Bidding the 4th unbid suit is artificial and forcing, seeking more info."
    },
    {
      id: 9,
      question: "What is a Michaels Cue Bid?",
      options: ["Strong hand", "2-suited overcall", "Defense", "Opening"],
      correctAnswer: 1,
      explanation: "Michaels: overcalling opponent's minor with same suit shows both majors."
    },
    {
      id: 10,
      question: "What is weak two bid?",
      options: ["2 HCP", "6-card suit, 6-10 HCP", "Two aces", "Pass twice"],
      correctAnswer: 1,
      explanation: "Weak two (2♦/♥/♠) shows 6-card suit with 6-10 HCP, pre-emptive."
    }
  ],

  // World 7: Trump Management
  7: [
    {
      id: 1,
      question: "What is a crossruff?",
      options: ["Angry play", "Ruffing in both hands", "Trump finesse", "Lead pattern"],
      correctAnswer: 1,
      explanation: "Crossruff: ruffing different suits back and forth between declarer and dummy."
    },
    {
      id: 2,
      question: "When is it right to lead trump on defense?",
      options: ["Always", "To stop ruffs", "Never", "In NT only"],
      correctAnswer: 1,
      explanation: "Lead trump to cut down declarer's ruffing potential."
    },
    {
      id: 3,
      question: "What is a trump promotion?",
      options: ["Advertising", "Making trump winners by force", "Drawing trumps", "Bidding higher"],
      correctAnswer: 1,
      explanation: "Trump promotion: forcing declarer to use high trump, promoting your lower trumps."
    },
    {
      id: 4,
      question: "What is an uppercut in defense?",
      options: ["Punch move", "Ruffing high to promote", "High lead", "Cover honor"],
      correctAnswer: 1,
      explanation: "Uppercut: ruffing high to force declarer to overruff, promoting partner's trumps."
    },
    {
      id: 5,
      question: "What is a dummy reversal?",
      options: ["Backwards play", "Using declarer hand for ruffs", "Bad bidding", "Trump echo"],
      correctAnswer: 1,
      explanation: "Dummy reversal: treating declarer's hand as dummy and ruffing there instead."
    },
    {
      id: 6,
      question: "You have 5 trumps, they have 5. Should you draw trumps?",
      options: ["Yes always", "No always", "Depends on hand", "Draw some only"],
      correctAnswer: 2,
      explanation: "It depends: consider if you need ruffs, trump quality, and side suits."
    },
    {
      id: 7,
      question: "What is a trump echo?",
      options: ["Sound effect", "High-low in trump", "Double trump", "Trump bid"],
      correctAnswer: 1,
      explanation: "Trump echo: playing high-low in trumps to show 3 trumps and interest in ruffing."
    },
    {
      id: 8,
      question: "What is a forcing defense?",
      options: ["Strong play", "Making declarer ruff", "Trump lead", "Aggressive bid"],
      correctAnswer: 1,
      explanation: "Forcing defense: making declarer ruff to shorten their trump holding."
    },
    {
      id: 9,
      question: "What does it mean to 'pitch a loser on a loser'?",
      options: ["Bad play", "Discard loser instead of ruff", "Trump losers", "Give up"],
      correctAnswer: 1,
      explanation: "Discard a loser from one suit on a losing card in another suit (not ruffing)."
    },
    {
      id: 10,
      question: "What is overruffing?",
      options: ["Ruffing too much", "Playing higher trump", "Extra ruff", "Trump signal"],
      correctAnswer: 1,
      explanation: "Overruffing: playing a higher trump when opponent has ruffed."
    }
  ],

  // World 8: Squeeze Play
  8: [
    {
      id: 1,
      question: "What is a squeeze?",
      options: ["Tight grip", "Forcing discard problems", "Trump play", "Bidding pressure"],
      correctAnswer: 1,
      explanation: "Squeeze: forcing opponent to discard, creating an extra trick."
    },
    {
      id: 2,
      question: "What is required for a simple squeeze?",
      options: ["High cards", "All but 1 trick needed", "Trump suit", "Partner"],
      correctAnswer: 1,
      explanation: "For a squeeze to work, you typically need all but one of the remaining tricks."
    },
    {
      id: 3,
      question: "What is a Vienna Coup?",
      options: ["Austrian bid", "Unblocking for squeeze", "Opening lead", "Defense"],
      correctAnswer: 1,
      explanation: "Vienna Coup: cashing a winner to unblock and set up a squeeze."
    },
    {
      id: 4,
      question: "What is a double squeeze?",
      options: ["Two squeezes", "Squeezing both opponents", "Very tight squeeze", "Trump squeeze"],
      correctAnswer: 1,
      explanation: "Double squeeze: squeezing both opponents in different suits."
    },
    {
      id: 5,
      question: "What is the squeeze card?",
      options: ["Ace", "Card that executes squeeze", "Trump", "Last card"],
      correctAnswer: 1,
      explanation: "The squeeze card is the winner that forces the crucial discard."
    },
    {
      id: 6,
      question: "What is a positional squeeze?",
      options: ["Based on seating", "Works vs one opponent", "Sitting properly", "Bid position"],
      correctAnswer: 1,
      explanation: "Positional squeeze: only works against opponent in specific seat."
    },
    {
      id: 7,
      question: "What is a trump squeeze?",
      options: ["Squeezing trumps", "Squeeze using trump threat", "Drawing trumps", "Trump finesse"],
      correctAnswer: 1,
      explanation: "Trump squeeze: using trump as one of the threats in a squeeze."
    },
    {
      id: 8,
      question: "What are the three elements needed for a squeeze?",
      options: ["AKQ", "Entry, threat, timing", "Trump, NT, skill", "Ace, King, Queen"],
      correctAnswer: 1,
      explanation: "Squeeze needs: proper entry, threat cards, and correct timing (Vienna Coup if needed)."
    },
    {
      id: 9,
      question: "What is a progressive squeeze?",
      options: ["Modern play", "Squeeze leading to squeeze", "Gradual pressure", "Practice squeeze"],
      correctAnswer: 1,
      explanation: "Progressive squeeze: first squeeze creates a second squeeze."
    },
    {
      id: 10,
      question: "What is rectifying the count?",
      options: ["Counting correctly", "Losing trick to set up squeeze", "Adding points", "Trump count"],
      correctAnswer: 1,
      explanation: "Rectifying count: deliberately losing a trick to reach the position where squeeze works."
    }
  ]
};

export default quizQuestions;