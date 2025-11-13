new end point : /auth/validate

async validateSession(): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/validate`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

for remmber user on refresh
validate user on start up?

refreash cookie?

logout need backend to set cookie to expire