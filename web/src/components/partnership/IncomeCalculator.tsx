"use client";

import { useState, type CSSProperties } from "react";
import { Users } from "lucide-react";

const CLIENT_LEVELS = [10, 100, 500, 1000, 5000, 10000, 20000] as const;

function estimateMonthlyIncome(clients: number) {
  return clients * 10;
}

export function IncomeCalculator() {
  const [level, setLevel] = useState(0);
  const clients = CLIENT_LEVELS[level];
  const monthlyIncome = estimateMonthlyIncome(clients);

  return (
    <div className="partner-calculator" aria-label="Illustrative partner income">
      <div className="partner-calculator__metric">
        <Users size={29} strokeWidth={1.7} aria-hidden="true" />
        <div>
          <strong>{clients.toLocaleString()}</strong>
          <span>Total clients</span>
        </div>
      </div>

      <div className="partner-calculator__control">
        <input
          type="range"
          min="0"
          max={CLIENT_LEVELS.length - 1}
          step="1"
          value={level}
          aria-label="Number of referred clients"
          onChange={(event) => setLevel(Number(event.target.value))}
          style={
            {
              "--partner-range": `${(level / (CLIENT_LEVELS.length - 1)) * 100}%`,
            } as CSSProperties
          }
        />
        <div className="partner-calculator__labels" aria-hidden="true">
          {CLIENT_LEVELS.map((value) => (
            <span key={value}>
              {value >= 1000 ? `${value / 1000}k` : value}
            </span>
          ))}
        </div>
      </div>

      <div className="partner-calculator__income">
        <span>Illustrative monthly income</span>
        <strong>${monthlyIncome.toLocaleString()}</strong>
        <small>Based on an illustrative average of $10 per client.</small>
      </div>
    </div>
  );
}
