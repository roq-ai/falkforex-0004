const mapping: Record<string, string> = {
  'forex-traders': 'forex_trader',
  organizations: 'organization',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
