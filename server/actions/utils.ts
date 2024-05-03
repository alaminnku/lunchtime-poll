'use server';

import { headers } from 'next/headers';

function sanitizeIp(ip: string) {
  const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  return ipRegex.test(ip) ? ip.trim() : null;
}

function sanitizeHeaderIp(forwardedFor: string) {
  const ips = forwardedFor.split(',');
  let sanitizedIps: string[] = [];
  for (const ip of ips) {
    const sanitized = sanitizeIp(ip.trim());
    if (sanitized) sanitizedIps.push(sanitized);
  }
  return sanitizedIps.length > 0 ? sanitizedIps[0] : null;
}

export async function getIp() {
  const forwardedFor = headers().get('x-forwarded-for');
  const realIp = headers().get('x-real-ip');

  let ip;
  if (forwardedFor) ip = sanitizeHeaderIp(forwardedFor);
  if (!ip && realIp) ip = sanitizeIp(realIp);
  return ip || '127.0.0.1';
}
