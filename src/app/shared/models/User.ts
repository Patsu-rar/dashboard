export interface User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  assessment_reports: [
    {
      id: number,
      name: string,
      users_resolved: number,
      active: boolean,
      image_url: string,
      data: {
        Agreeableness: number,
        Drive: number,
        Luck: number,
        Openess: number
      },
      type: string
    }
  ]
  token: string;
}
