import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import html2pdf from 'html2pdf.js'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function exportAsPdf(id) {
  const element = document.getElementById(id)
  html2pdf().from(element).save()
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}
