import { useMemo, useState } from 'react';
import { enumerateNights, monthGrid, shiftMonth, todayISO } from '../utils/dates';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DateRangePicker({ checkIn, checkOut, blocked = [], onChange }) {
  const today = todayISO();
  const start = checkIn || today;
  const initial = start.slice(0, 7).split('-');
  const [cursor, setCursor] = useState({ year: Number(initial[0]), month: Number(initial[1]) - 1 });
  const [picking, setPicking] = useState(checkIn && !checkOut ? 'out' : 'in');

  const months = useMemo(() => {
    const first = monthGrid(cursor.year, cursor.month);
    const next = shiftMonth(cursor.year, cursor.month, 1);
    return [first, monthGrid(next.year, next.month)];
  }, [cursor]);

  const blockedSet = useMemo(() => new Set(blocked), [blocked]);

  const isDisabled = (iso) => {
    if (!iso) return true;
    if (iso < today) return true;
    if (blockedSet.has(iso)) return true;
    if (picking === 'out' && checkIn && iso <= checkIn) return true;
    if (picking === 'out' && checkIn) {
      return enumerateNights(checkIn, iso).some((night) => blockedSet.has(night));
    }
    return false;
  };

  const selectDay = (iso) => {
    if (isDisabled(iso)) return;
    if (picking === 'in' || !checkIn || iso <= checkIn) {
      onChange({ checkIn: iso, checkOut: '' });
      setPicking('out');
      return;
    }
    onChange({ checkIn, checkOut: iso });
    setPicking('in');
  };

  const inRange = (iso) => checkIn && checkOut && iso > checkIn && iso < checkOut;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          className="text-sm text-zinc-400 hover:text-brand-amber"
          onClick={() => setCursor((prev) => shiftMonth(prev.year, prev.month, -1))}
        >
          Previous
        </button>
        <p className="text-[11px] tracking-[0.16em] text-zinc-500">
          {picking === 'out' ? 'Choose check-out' : 'Choose check-in'}
        </p>
        <button
          type="button"
          className="text-sm text-zinc-400 hover:text-brand-amber"
          onClick={() => setCursor((prev) => shiftMonth(prev.year, prev.month, 1))}
        >
          Next
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {months.map((month) => (
          <div key={month.label}>
            <p className="font-serif text-lg mb-3">{month.label}</p>
            <div className="grid grid-cols-7 text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              {WEEKDAYS.map((day) => (
                <span key={day} className="text-center py-1">
                  {day}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {month.cells.map((iso, index) => {
                const selected = iso && (iso === checkIn || iso === checkOut);
                const ranged = iso && inRange(iso);
                const disabled = isDisabled(iso);
                return (
                  <button
                    key={`${month.label}-${index}`}
                    type="button"
                    disabled={!iso || disabled}
                    onClick={() => selectDay(iso)}
                    className={`h-9 text-sm rounded-full ${
                      !iso
                        ? 'invisible'
                        : selected
                          ? 'bg-brand-amber text-zinc-950'
                          : ranged
                            ? 'bg-brand-amber/20 text-zinc-100'
                            : disabled
                              ? 'text-zinc-700 line-through'
                              : 'text-zinc-200 hover:bg-white/10'
                    }`}
                  >
                    {iso ? Number(iso.slice(-2)) : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
