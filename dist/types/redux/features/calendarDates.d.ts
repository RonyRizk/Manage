import { PayloadAction } from '@reduxjs/toolkit';
import { DayData } from '../../models/DayType';
export interface ICalendarDates {
  days: DayData[];
  months: {
    daysCount: number;
    monthName: string;
  }[];
}
export declare const calendarDatesSlice: import("@reduxjs/toolkit").Slice<ICalendarDates, {
  addCalendarDates: (state: {
    days: {
      day: string;
      dayDisplayName: string;
      currentDate: number;
      tobeAssignedCount?: number;
      rate: {
        availabilities: number;
        id: number;
        inventory: number;
        name: string;
        physicalrooms: {
          calendar_cell: {
            left_cell: {
              Is_Available: boolean;
              booking: {
                arrival: {
                  code: string;
                  description: string;
                };
                booked_on: {
                  date: string;
                  hour: number;
                  minute: number;
                };
                booking_nbr: string;
                currency: {
                  code: string;
                  id: number;
                };
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                origin: {
                  Icon: string;
                  Label: string;
                };
                property: {
                  calendar_legends: null;
                  currency: null;
                  id: number;
                  name: string;
                  roomtypes: null;
                };
                remark: string;
                rooms: {
                  days: {
                    amount: number;
                    date: string;
                  }[];
                  from_date: string;
                  guest: {
                    address: string;
                    city: string;
                    country_id: number;
                    dob: string;
                    email: string;
                    first_name: string;
                    id: number;
                    last_name: string;
                    mobile: string;
                    subscribe_to_news_letter: boolean;
                    cci?: {
                      nbr: string | number;
                      holder_name: string | number;
                      expiry_month: string | number;
                      expiry_year: string | number;
                      cvc?: string;
                    };
                    alternative_email?: string;
                  };
                  notes: string;
                  occupancy: {
                    adult_nbr: number;
                    children_nbr: number;
                    infant_nbr: number;
                  };
                  physicalroom: null;
                  rateplan: {
                    cancelation: string;
                    guarantee: null;
                    id: number;
                    name: string;
                    rate_restrictions: null;
                    variations: null;
                    selected_variation: {
                      adult_child_offering: string;
                      adult_nbr: number;
                      amount: number;
                      child_nbr: number;
                    };
                    is_non_refundable: boolean;
                    custom_text: string;
                  };
                  roomtype: {
                    availabilities: null;
                    id: number;
                    inventory: number;
                    name: string;
                    physicalrooms: null;
                    rate: number;
                    rateplans: null;
                  };
                  to_date: string;
                  total: number;
                  identifier: string;
                  unit: string | number | {
                    calendar_cell: null;
                    id: 2;
                    name: "402";
                  };
                }[];
                source: {
                  code: string;
                  description: string;
                  tag: string;
                };
                status: {
                  code: string;
                  description: string;
                };
                to_date: string;
                total: number;
                is_editable: boolean;
                format: {
                  from_date: string;
                  to_date: string;
                };
                channel_booking_nbr: string;
                is_direct: boolean;
                financial: {
                  due_amount: number;
                  due_dates: {
                    amount: number;
                    currencysymbol: string;
                    date: string;
                    description: string;
                    room: string;
                  }[];
                  payments: {
                    id: number;
                    date: string;
                    amount: number;
                    currency: {
                      code: string;
                      id: number;
                    };
                    designation: string;
                    reference: string;
                  }[];
                };
              };
              POOL: string;
              STAY_SHIFT_CODE: string;
              STAY_STATUS_CODE: string;
              DATE: string;
              My_Block_Info?: {
                BLOCKED_TILL_DATE: string;
                BLOCKED_TILL_HOUR: number;
                BLOCKED_TILL_MINUTE: number;
                DESCRIPTION: string;
                NOTES: string;
                STAY_STATUS_CODE: string;
                from_date: string;
                pr_id: number;
                to_date: string;
                format: {
                  from_date: string;
                  to_date: string;
                };
              };
              pr_id: number;
              room: {
                days: {
                  amount: number;
                  date: string;
                }[];
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                notes: string;
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                physicalroom: null;
                rateplan: {
                  cancelation: string;
                  guarantee: null;
                  id: number;
                  name: string;
                  rate_restrictions: null;
                  variations: null;
                  selected_variation: {
                    adult_child_offering: string;
                    adult_nbr: number;
                    amount: number;
                    child_nbr: number;
                  };
                  is_non_refundable: boolean;
                  custom_text: string;
                };
                roomtype: {
                  availabilities: null;
                  id: number;
                  inventory: number;
                  name: string;
                  physicalrooms: null;
                  rate: number;
                  rateplans: null;
                };
                to_date: string;
                total: number;
                identifier: string;
                unit: string | number | {
                  calendar_cell: null;
                  id: 2;
                  name: "402";
                };
              };
            };
            right_cell: {
              Is_Available: boolean;
              booking: {
                arrival: {
                  code: string;
                  description: string;
                };
                booked_on: {
                  date: string;
                  hour: number;
                  minute: number;
                };
                booking_nbr: string;
                currency: {
                  code: string;
                  id: number;
                };
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                origin: {
                  Icon: string;
                  Label: string;
                };
                property: {
                  calendar_legends: null;
                  currency: null;
                  id: number;
                  name: string;
                  roomtypes: null;
                };
                remark: string;
                rooms: {
                  days: {
                    amount: number;
                    date: string;
                  }[];
                  from_date: string;
                  guest: {
                    address: string;
                    city: string;
                    country_id: number;
                    dob: string;
                    email: string;
                    first_name: string;
                    id: number;
                    last_name: string;
                    mobile: string;
                    subscribe_to_news_letter: boolean;
                    cci?: {
                      nbr: string | number;
                      holder_name: string | number;
                      expiry_month: string | number;
                      expiry_year: string | number;
                      cvc?: string;
                    };
                    alternative_email?: string;
                  };
                  notes: string;
                  occupancy: {
                    adult_nbr: number;
                    children_nbr: number;
                    infant_nbr: number;
                  };
                  physicalroom: null;
                  rateplan: {
                    cancelation: string;
                    guarantee: null;
                    id: number;
                    name: string;
                    rate_restrictions: null;
                    variations: null;
                    selected_variation: {
                      adult_child_offering: string;
                      adult_nbr: number;
                      amount: number;
                      child_nbr: number;
                    };
                    is_non_refundable: boolean;
                    custom_text: string;
                  };
                  roomtype: {
                    availabilities: null;
                    id: number;
                    inventory: number;
                    name: string;
                    physicalrooms: null;
                    rate: number;
                    rateplans: null;
                  };
                  to_date: string;
                  total: number;
                  identifier: string;
                  unit: string | number | {
                    calendar_cell: null;
                    id: 2;
                    name: "402";
                  };
                }[];
                source: {
                  code: string;
                  description: string;
                  tag: string;
                };
                status: {
                  code: string;
                  description: string;
                };
                to_date: string;
                total: number;
                is_editable: boolean;
                format: {
                  from_date: string;
                  to_date: string;
                };
                channel_booking_nbr: string;
                is_direct: boolean;
                financial: {
                  due_amount: number;
                  due_dates: {
                    amount: number;
                    currencysymbol: string;
                    date: string;
                    description: string;
                    room: string;
                  }[];
                  payments: {
                    id: number;
                    date: string;
                    amount: number;
                    currency: {
                      code: string;
                      id: number;
                    };
                    designation: string;
                    reference: string;
                  }[];
                };
              };
              POOL: string;
              STAY_SHIFT_CODE: string;
              STAY_STATUS_CODE: string;
              DATE: string;
              My_Block_Info?: {
                BLOCKED_TILL_DATE: string;
                BLOCKED_TILL_HOUR: number;
                BLOCKED_TILL_MINUTE: number;
                DESCRIPTION: string;
                NOTES: string;
                STAY_STATUS_CODE: string;
                from_date: string;
                pr_id: number;
                to_date: string;
                format: {
                  from_date: string;
                  to_date: string;
                };
              };
              pr_id: number;
              room: {
                days: {
                  amount: number;
                  date: string;
                }[];
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                notes: string;
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                physicalroom: null;
                rateplan: {
                  cancelation: string;
                  guarantee: null;
                  id: number;
                  name: string;
                  rate_restrictions: null;
                  variations: null;
                  selected_variation: {
                    adult_child_offering: string;
                    adult_nbr: number;
                    amount: number;
                    child_nbr: number;
                  };
                  is_non_refundable: boolean;
                  custom_text: string;
                };
                roomtype: {
                  availabilities: null;
                  id: number;
                  inventory: number;
                  name: string;
                  physicalrooms: null;
                  rate: number;
                  rateplans: null;
                };
                to_date: string;
                total: number;
                identifier: string;
                unit: string | number | {
                  calendar_cell: null;
                  id: 2;
                  name: "402";
                };
              };
            };
          };
          id: number;
          name: string;
        }[];
        rate: number;
        rateplans: {
          id: number;
          name: string;
          rate_restrictions: number;
        }[];
      }[];
      unassigned_units_nbr: number;
      occupancy: number;
    }[];
    months: {
      daysCount: number;
      monthName: string;
    }[];
  }, action: PayloadAction<ICalendarDates>) => {
    days: DayData[];
    months: {
      daysCount: number;
      monthName: string;
    }[];
  };
  updateCalendarDates: (state: {
    days: {
      day: string;
      dayDisplayName: string;
      currentDate: number;
      tobeAssignedCount?: number;
      rate: {
        availabilities: number;
        id: number;
        inventory: number;
        name: string;
        physicalrooms: {
          calendar_cell: {
            left_cell: {
              Is_Available: boolean;
              booking: {
                arrival: {
                  code: string;
                  description: string;
                };
                booked_on: {
                  date: string;
                  hour: number;
                  minute: number;
                };
                booking_nbr: string;
                currency: {
                  code: string;
                  id: number;
                };
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                origin: {
                  Icon: string;
                  Label: string;
                };
                property: {
                  calendar_legends: null;
                  currency: null;
                  id: number;
                  name: string;
                  roomtypes: null;
                };
                remark: string;
                rooms: {
                  days: {
                    amount: number;
                    date: string;
                  }[];
                  from_date: string;
                  guest: {
                    address: string;
                    city: string;
                    country_id: number;
                    dob: string;
                    email: string;
                    first_name: string;
                    id: number;
                    last_name: string;
                    mobile: string;
                    subscribe_to_news_letter: boolean;
                    cci?: {
                      nbr: string | number;
                      holder_name: string | number;
                      expiry_month: string | number;
                      expiry_year: string | number;
                      cvc?: string;
                    };
                    alternative_email?: string;
                  };
                  notes: string;
                  occupancy: {
                    adult_nbr: number;
                    children_nbr: number;
                    infant_nbr: number;
                  };
                  physicalroom: null;
                  rateplan: {
                    cancelation: string;
                    guarantee: null;
                    id: number;
                    name: string;
                    rate_restrictions: null;
                    variations: null;
                    selected_variation: {
                      adult_child_offering: string;
                      adult_nbr: number;
                      amount: number;
                      child_nbr: number;
                    };
                    is_non_refundable: boolean;
                    custom_text: string;
                  };
                  roomtype: {
                    availabilities: null;
                    id: number;
                    inventory: number;
                    name: string;
                    physicalrooms: null;
                    rate: number;
                    rateplans: null;
                  };
                  to_date: string;
                  total: number;
                  identifier: string;
                  unit: string | number | {
                    calendar_cell: null;
                    id: 2;
                    name: "402";
                  };
                }[];
                source: {
                  code: string;
                  description: string;
                  tag: string;
                };
                status: {
                  code: string;
                  description: string;
                };
                to_date: string;
                total: number;
                is_editable: boolean;
                format: {
                  from_date: string;
                  to_date: string;
                };
                channel_booking_nbr: string;
                is_direct: boolean;
                financial: {
                  due_amount: number;
                  due_dates: {
                    amount: number;
                    currencysymbol: string;
                    date: string;
                    description: string;
                    room: string;
                  }[];
                  payments: {
                    id: number;
                    date: string;
                    amount: number;
                    currency: {
                      code: string;
                      id: number;
                    };
                    designation: string;
                    reference: string;
                  }[];
                };
              };
              POOL: string;
              STAY_SHIFT_CODE: string;
              STAY_STATUS_CODE: string;
              DATE: string;
              My_Block_Info?: {
                BLOCKED_TILL_DATE: string;
                BLOCKED_TILL_HOUR: number;
                BLOCKED_TILL_MINUTE: number;
                DESCRIPTION: string;
                NOTES: string;
                STAY_STATUS_CODE: string;
                from_date: string;
                pr_id: number;
                to_date: string;
                format: {
                  from_date: string;
                  to_date: string;
                };
              };
              pr_id: number;
              room: {
                days: {
                  amount: number;
                  date: string;
                }[];
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                notes: string;
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                physicalroom: null;
                rateplan: {
                  cancelation: string;
                  guarantee: null;
                  id: number;
                  name: string;
                  rate_restrictions: null;
                  variations: null;
                  selected_variation: {
                    adult_child_offering: string;
                    adult_nbr: number;
                    amount: number;
                    child_nbr: number;
                  };
                  is_non_refundable: boolean;
                  custom_text: string;
                };
                roomtype: {
                  availabilities: null;
                  id: number;
                  inventory: number;
                  name: string;
                  physicalrooms: null;
                  rate: number;
                  rateplans: null;
                };
                to_date: string;
                total: number;
                identifier: string;
                unit: string | number | {
                  calendar_cell: null;
                  id: 2;
                  name: "402";
                };
              };
            };
            right_cell: {
              Is_Available: boolean;
              booking: {
                arrival: {
                  code: string;
                  description: string;
                };
                booked_on: {
                  date: string;
                  hour: number;
                  minute: number;
                };
                booking_nbr: string;
                currency: {
                  code: string;
                  id: number;
                };
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                origin: {
                  Icon: string;
                  Label: string;
                };
                property: {
                  calendar_legends: null;
                  currency: null;
                  id: number;
                  name: string;
                  roomtypes: null;
                };
                remark: string;
                rooms: {
                  days: {
                    amount: number;
                    date: string;
                  }[];
                  from_date: string;
                  guest: {
                    address: string;
                    city: string;
                    country_id: number;
                    dob: string;
                    email: string;
                    first_name: string;
                    id: number;
                    last_name: string;
                    mobile: string;
                    subscribe_to_news_letter: boolean;
                    cci?: {
                      nbr: string | number;
                      holder_name: string | number;
                      expiry_month: string | number;
                      expiry_year: string | number;
                      cvc?: string;
                    };
                    alternative_email?: string;
                  };
                  notes: string;
                  occupancy: {
                    adult_nbr: number;
                    children_nbr: number;
                    infant_nbr: number;
                  };
                  physicalroom: null;
                  rateplan: {
                    cancelation: string;
                    guarantee: null;
                    id: number;
                    name: string;
                    rate_restrictions: null;
                    variations: null;
                    selected_variation: {
                      adult_child_offering: string;
                      adult_nbr: number;
                      amount: number;
                      child_nbr: number;
                    };
                    is_non_refundable: boolean;
                    custom_text: string;
                  };
                  roomtype: {
                    availabilities: null;
                    id: number;
                    inventory: number;
                    name: string;
                    physicalrooms: null;
                    rate: number;
                    rateplans: null;
                  };
                  to_date: string;
                  total: number;
                  identifier: string;
                  unit: string | number | {
                    calendar_cell: null;
                    id: 2;
                    name: "402";
                  };
                }[];
                source: {
                  code: string;
                  description: string;
                  tag: string;
                };
                status: {
                  code: string;
                  description: string;
                };
                to_date: string;
                total: number;
                is_editable: boolean;
                format: {
                  from_date: string;
                  to_date: string;
                };
                channel_booking_nbr: string;
                is_direct: boolean;
                financial: {
                  due_amount: number;
                  due_dates: {
                    amount: number;
                    currencysymbol: string;
                    date: string;
                    description: string;
                    room: string;
                  }[];
                  payments: {
                    id: number;
                    date: string;
                    amount: number;
                    currency: {
                      code: string;
                      id: number;
                    };
                    designation: string;
                    reference: string;
                  }[];
                };
              };
              POOL: string;
              STAY_SHIFT_CODE: string;
              STAY_STATUS_CODE: string;
              DATE: string;
              My_Block_Info?: {
                BLOCKED_TILL_DATE: string;
                BLOCKED_TILL_HOUR: number;
                BLOCKED_TILL_MINUTE: number;
                DESCRIPTION: string;
                NOTES: string;
                STAY_STATUS_CODE: string;
                from_date: string;
                pr_id: number;
                to_date: string;
                format: {
                  from_date: string;
                  to_date: string;
                };
              };
              pr_id: number;
              room: {
                days: {
                  amount: number;
                  date: string;
                }[];
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                notes: string;
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                physicalroom: null;
                rateplan: {
                  cancelation: string;
                  guarantee: null;
                  id: number;
                  name: string;
                  rate_restrictions: null;
                  variations: null;
                  selected_variation: {
                    adult_child_offering: string;
                    adult_nbr: number;
                    amount: number;
                    child_nbr: number;
                  };
                  is_non_refundable: boolean;
                  custom_text: string;
                };
                roomtype: {
                  availabilities: null;
                  id: number;
                  inventory: number;
                  name: string;
                  physicalrooms: null;
                  rate: number;
                  rateplans: null;
                };
                to_date: string;
                total: number;
                identifier: string;
                unit: string | number | {
                  calendar_cell: null;
                  id: 2;
                  name: "402";
                };
              };
            };
          };
          id: number;
          name: string;
        }[];
        rate: number;
        rateplans: {
          id: number;
          name: string;
          rate_restrictions: number;
        }[];
      }[];
      unassigned_units_nbr: number;
      occupancy: number;
    }[];
    months: {
      daysCount: number;
      monthName: string;
    }[];
  }, action: PayloadAction<ICalendarDates>) => {
    days: {
      day: string;
      dayDisplayName: string;
      currentDate: number;
      tobeAssignedCount?: number;
      rate: {
        availabilities: number;
        id: number;
        inventory: number;
        name: string;
        physicalrooms: {
          calendar_cell: {
            left_cell: {
              Is_Available: boolean;
              booking: {
                arrival: {
                  code: string;
                  description: string;
                };
                booked_on: {
                  date: string;
                  hour: number;
                  minute: number;
                };
                booking_nbr: string;
                currency: {
                  code: string;
                  id: number;
                };
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                origin: {
                  Icon: string;
                  Label: string;
                };
                property: {
                  calendar_legends: null;
                  currency: null;
                  id: number;
                  name: string;
                  roomtypes: null;
                };
                remark: string;
                rooms: {
                  days: {
                    amount: number;
                    date: string;
                  }[];
                  from_date: string;
                  guest: {
                    address: string;
                    city: string;
                    country_id: number;
                    dob: string;
                    email: string;
                    first_name: string;
                    id: number;
                    last_name: string;
                    mobile: string;
                    subscribe_to_news_letter: boolean;
                    cci?: {
                      nbr: string | number;
                      holder_name: string | number;
                      expiry_month: string | number;
                      expiry_year: string | number;
                      cvc?: string;
                    };
                    alternative_email?: string;
                  };
                  notes: string;
                  occupancy: {
                    adult_nbr: number;
                    children_nbr: number;
                    infant_nbr: number;
                  };
                  physicalroom: null;
                  rateplan: {
                    cancelation: string;
                    guarantee: null;
                    id: number;
                    name: string;
                    rate_restrictions: null;
                    variations: null;
                    selected_variation: {
                      adult_child_offering: string;
                      adult_nbr: number;
                      amount: number;
                      child_nbr: number;
                    };
                    is_non_refundable: boolean;
                    custom_text: string;
                  };
                  roomtype: {
                    availabilities: null;
                    id: number;
                    inventory: number;
                    name: string;
                    physicalrooms: null;
                    rate: number;
                    rateplans: null;
                  };
                  to_date: string;
                  total: number;
                  identifier: string;
                  unit: string | number | {
                    calendar_cell: null;
                    id: 2;
                    name: "402";
                  };
                }[];
                source: {
                  code: string;
                  description: string;
                  tag: string;
                };
                status: {
                  code: string;
                  description: string;
                };
                to_date: string;
                total: number;
                is_editable: boolean;
                format: {
                  from_date: string;
                  to_date: string;
                };
                channel_booking_nbr: string;
                is_direct: boolean;
                financial: {
                  due_amount: number;
                  due_dates: {
                    amount: number;
                    currencysymbol: string;
                    date: string;
                    description: string;
                    room: string;
                  }[];
                  payments: {
                    id: number;
                    date: string;
                    amount: number;
                    currency: {
                      code: string;
                      id: number;
                    };
                    designation: string;
                    reference: string;
                  }[];
                };
              };
              POOL: string;
              STAY_SHIFT_CODE: string;
              STAY_STATUS_CODE: string;
              DATE: string;
              My_Block_Info?: {
                BLOCKED_TILL_DATE: string;
                BLOCKED_TILL_HOUR: number;
                BLOCKED_TILL_MINUTE: number;
                DESCRIPTION: string;
                NOTES: string;
                STAY_STATUS_CODE: string;
                from_date: string;
                pr_id: number;
                to_date: string;
                format: {
                  from_date: string;
                  to_date: string;
                };
              };
              pr_id: number;
              room: {
                days: {
                  amount: number;
                  date: string;
                }[];
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                notes: string;
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                physicalroom: null;
                rateplan: {
                  cancelation: string;
                  guarantee: null;
                  id: number;
                  name: string;
                  rate_restrictions: null;
                  variations: null;
                  selected_variation: {
                    adult_child_offering: string;
                    adult_nbr: number;
                    amount: number;
                    child_nbr: number;
                  };
                  is_non_refundable: boolean;
                  custom_text: string;
                };
                roomtype: {
                  availabilities: null;
                  id: number;
                  inventory: number;
                  name: string;
                  physicalrooms: null;
                  rate: number;
                  rateplans: null;
                };
                to_date: string;
                total: number;
                identifier: string;
                unit: string | number | {
                  calendar_cell: null;
                  id: 2;
                  name: "402";
                };
              };
            };
            right_cell: {
              Is_Available: boolean;
              booking: {
                arrival: {
                  code: string;
                  description: string;
                };
                booked_on: {
                  date: string;
                  hour: number;
                  minute: number;
                };
                booking_nbr: string;
                currency: {
                  code: string;
                  id: number;
                };
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                origin: {
                  Icon: string;
                  Label: string;
                };
                property: {
                  calendar_legends: null;
                  currency: null;
                  id: number;
                  name: string;
                  roomtypes: null;
                };
                remark: string;
                rooms: {
                  days: {
                    amount: number;
                    date: string;
                  }[];
                  from_date: string;
                  guest: {
                    address: string;
                    city: string;
                    country_id: number;
                    dob: string;
                    email: string;
                    first_name: string;
                    id: number;
                    last_name: string;
                    mobile: string;
                    subscribe_to_news_letter: boolean;
                    cci?: {
                      nbr: string | number;
                      holder_name: string | number;
                      expiry_month: string | number;
                      expiry_year: string | number;
                      cvc?: string;
                    };
                    alternative_email?: string;
                  };
                  notes: string;
                  occupancy: {
                    adult_nbr: number;
                    children_nbr: number;
                    infant_nbr: number;
                  };
                  physicalroom: null;
                  rateplan: {
                    cancelation: string;
                    guarantee: null;
                    id: number;
                    name: string;
                    rate_restrictions: null;
                    variations: null;
                    selected_variation: {
                      adult_child_offering: string;
                      adult_nbr: number;
                      amount: number;
                      child_nbr: number;
                    };
                    is_non_refundable: boolean;
                    custom_text: string;
                  };
                  roomtype: {
                    availabilities: null;
                    id: number;
                    inventory: number;
                    name: string;
                    physicalrooms: null;
                    rate: number;
                    rateplans: null;
                  };
                  to_date: string;
                  total: number;
                  identifier: string;
                  unit: string | number | {
                    calendar_cell: null;
                    id: 2;
                    name: "402";
                  };
                }[];
                source: {
                  code: string;
                  description: string;
                  tag: string;
                };
                status: {
                  code: string;
                  description: string;
                };
                to_date: string;
                total: number;
                is_editable: boolean;
                format: {
                  from_date: string;
                  to_date: string;
                };
                channel_booking_nbr: string;
                is_direct: boolean;
                financial: {
                  due_amount: number;
                  due_dates: {
                    amount: number;
                    currencysymbol: string;
                    date: string;
                    description: string;
                    room: string;
                  }[];
                  payments: {
                    id: number;
                    date: string;
                    amount: number;
                    currency: {
                      code: string;
                      id: number;
                    };
                    designation: string;
                    reference: string;
                  }[];
                };
              };
              POOL: string;
              STAY_SHIFT_CODE: string;
              STAY_STATUS_CODE: string;
              DATE: string;
              My_Block_Info?: {
                BLOCKED_TILL_DATE: string;
                BLOCKED_TILL_HOUR: number;
                BLOCKED_TILL_MINUTE: number;
                DESCRIPTION: string;
                NOTES: string;
                STAY_STATUS_CODE: string;
                from_date: string;
                pr_id: number;
                to_date: string;
                format: {
                  from_date: string;
                  to_date: string;
                };
              };
              pr_id: number;
              room: {
                days: {
                  amount: number;
                  date: string;
                }[];
                from_date: string;
                guest: {
                  address: string;
                  city: string;
                  country_id: number;
                  dob: string;
                  email: string;
                  first_name: string;
                  id: number;
                  last_name: string;
                  mobile: string;
                  subscribe_to_news_letter: boolean;
                  cci?: {
                    nbr: string | number;
                    holder_name: string | number;
                    expiry_month: string | number;
                    expiry_year: string | number;
                    cvc?: string;
                  };
                  alternative_email?: string;
                };
                notes: string;
                occupancy: {
                  adult_nbr: number;
                  children_nbr: number;
                  infant_nbr: number;
                };
                physicalroom: null;
                rateplan: {
                  cancelation: string;
                  guarantee: null;
                  id: number;
                  name: string;
                  rate_restrictions: null;
                  variations: null;
                  selected_variation: {
                    adult_child_offering: string;
                    adult_nbr: number;
                    amount: number;
                    child_nbr: number;
                  };
                  is_non_refundable: boolean;
                  custom_text: string;
                };
                roomtype: {
                  availabilities: null;
                  id: number;
                  inventory: number;
                  name: string;
                  physicalrooms: null;
                  rate: number;
                  rateplans: null;
                };
                to_date: string;
                total: number;
                identifier: string;
                unit: string | number | {
                  calendar_cell: null;
                  id: 2;
                  name: "402";
                };
              };
            };
          };
          id: number;
          name: string;
        }[];
        rate: number;
        rateplans: {
          id: number;
          name: string;
          rate_restrictions: number;
        }[];
      }[];
      unassigned_units_nbr: number;
      occupancy: number;
    }[];
    months: {
      daysCount: number;
      monthName: string;
    }[];
  };
}, "calendar_dates", "calendar_dates", import("@reduxjs/toolkit").SliceSelectors<ICalendarDates>>;
export declare const addCalendarDates: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<ICalendarDates, "calendar_dates/addCalendarDates">, updateCalendarDates: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<ICalendarDates, "calendar_dates/updateCalendarDates">;
declare const _default: import("redux").Reducer<ICalendarDates>;
export default _default;
