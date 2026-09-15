/**
 * ADP Career Center link per location, from the client's "ADP Careers Center
 * Links" workbook. Keyed by the slug in `locations` so the careers grid and the
 * location pages stay in step — a location with no entry here simply gets no
 * tile rather than a dead one.
 *
 * Every link shares one ADP account (cid) and carries its own career-centre id
 * (ccId). Marina Harbor is the exception and is deliberately absent: its row in
 * the sheet has ccId=19000101_000001, an epoch placeholder rather than a real
 * centre, and the workbook's second tab annotates that row "don't use this one".
 * Pointing a candidate at it would land them on an empty career centre, so until
 * the real id arrives that tile falls back to the network-wide centre below.
 */
export const CAREERS_FALLBACK =
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200857813559_2&lang=en_US";

export const careerLinks: Record<string, string> = {
  "laguna-view-detox":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200865816229_2&lang=en_US",
  "ocean-coast-recovery":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200866717655_2&lang=en_US",
  "hillside-mission-recovery":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200865817070_2&lang=en_US",
  // "marina-harbor-detox": omitted — see the note above (Marina Harbor Detox).
  "wellness-detox-la":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200857811822_2&lang=en_US",
  "dallas-detox-center":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200865813587_2&lang=en_US",
  "fort-worth-wellness":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9201318903306_2&lang=en_US",
  "seaside-wellness":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200867085656_2&lang=en_US",
  "wellness-recovery-nj":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200865815387_2&lang=en_US",
  "des-moines-wellness":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9201562455183_2&lang=en_US",
  "ohio-recovery-collective":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9201746525360_2&lang=en_US",
  "greater-texas-behavioral":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9200865814254_2&lang=en_US",
  "wellness-ranch-kentucky":
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=e1094ba9-8b93-4f55-9dab-3102a4eaaa49&ccId=9201728768392_2&lang=en_US",
};
