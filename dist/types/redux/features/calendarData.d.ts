import { PayloadAction } from '@reduxjs/toolkit';
import { CalendarDataDetails } from '../../models/calendarData';
export declare const calendarDataSlice: import("@reduxjs/toolkit").Slice<CalendarDataDetails, {
  addCalendarData: (state: {
    adultChildConstraints: {
      adult_max_nbr: number;
      child_max_nbr: number;
      child_max_age: number;
    };
    allowedBookingSources: {
      code: string;
      description: string;
      id: string;
      tag: string;
      type: string;
    }[];
    currency: {
      code: string;
      id: number;
    };
    endingDate: number;
    formattedLegendData: {
      legendData: {
        color: string;
        design: string;
        id: string;
        name: string;
      }[];
      statusId: {
        "IN-HOUSE": {
          id: number;
          clsName: string;
        };
        CONFIRMED: {
          id: number;
          clsName: string;
        };
        "PENDING-CONFIRMATION": {
          id: number;
          clsName: string;
        };
        "SPLIT-UNIT": {
          id: number;
          clsName: string;
        };
        "CHECKED-IN": {
          id: number;
          clsName: string;
        };
        "CHECKED-OUT": {
          id: number;
          clsName: string;
        };
        BLOCKED: {
          id: number;
          clsName: string;
        };
        "BLOCKED-WITH-DATES": {
          id: number;
          clsName: string;
        };
        NOTES: {
          id: number;
          clsName: string;
        };
        "OUTSTANDING-BALANCE": {
          id: number;
          clsName: string;
        };
      };
    };
    is_vacation_rental: boolean;
    legendData: {
      color: string;
      design: string;
      id: string;
      name: string;
    }[];
    roomsInfo: {
      availabilities: number;
      id: number;
      inventory: number;
      name: string;
      rate: number;
      rateplans: {
        id: number;
        name: string;
        rate_restrictions: null;
        variations: {
          adult_child_offering: string;
          adult_nbr: number;
          amount: number;
          child_nbr: number;
        }[];
        totalRooms: number;
        index: number;
        isFirst: boolean;
      }[];
      physicalrooms: {
        calendar_cell: null;
        id: number;
        name: string;
      }[];
      exposed_inventory: null;
      occupancy_default: {
        adult_nbr: number;
        children_nbr: number;
        infant_nbr: null;
      };
    }[];
    startingDate: number;
    language: string;
    toBeAssignedEvents: [];
  }, action: PayloadAction<CalendarDataDetails>) => {
    adultChildConstraints: import("../..").TAdultChildConstraints;
    allowedBookingSources: import("../../models/calendarData").IAllowedBookingSources[];
    currency: import("../../models/calendarData").ICurrency;
    endingDate: number;
    formattedLegendData: import("../../models/calendarData").IFormattedLegendData;
    is_vacation_rental: boolean;
    legendData: import("../../models/calendarData").ILegendData[];
    roomsInfo: import("../../models/IBooking").RoomDetail[];
    startingDate: number;
    language: string;
    toBeAssignedEvents: [];
  };
  updateCalendarData: (state: {
    adultChildConstraints: {
      adult_max_nbr: number;
      child_max_nbr: number;
      child_max_age: number;
    };
    allowedBookingSources: {
      code: string;
      description: string;
      id: string;
      tag: string;
      type: string;
    }[];
    currency: {
      code: string;
      id: number;
    };
    endingDate: number;
    formattedLegendData: {
      legendData: {
        color: string;
        design: string;
        id: string;
        name: string;
      }[];
      statusId: {
        "IN-HOUSE": {
          id: number;
          clsName: string;
        };
        CONFIRMED: {
          id: number;
          clsName: string;
        };
        "PENDING-CONFIRMATION": {
          id: number;
          clsName: string;
        };
        "SPLIT-UNIT": {
          id: number;
          clsName: string;
        };
        "CHECKED-IN": {
          id: number;
          clsName: string;
        };
        "CHECKED-OUT": {
          id: number;
          clsName: string;
        };
        BLOCKED: {
          id: number;
          clsName: string;
        };
        "BLOCKED-WITH-DATES": {
          id: number;
          clsName: string;
        };
        NOTES: {
          id: number;
          clsName: string;
        };
        "OUTSTANDING-BALANCE": {
          id: number;
          clsName: string;
        };
      };
    };
    is_vacation_rental: boolean;
    legendData: {
      color: string;
      design: string;
      id: string;
      name: string;
    }[];
    roomsInfo: {
      availabilities: number;
      id: number;
      inventory: number;
      name: string;
      rate: number;
      rateplans: {
        id: number;
        name: string;
        rate_restrictions: null;
        variations: {
          adult_child_offering: string;
          adult_nbr: number;
          amount: number;
          child_nbr: number;
        }[];
        totalRooms: number;
        index: number;
        isFirst: boolean;
      }[];
      physicalrooms: {
        calendar_cell: null;
        id: number;
        name: string;
      }[];
      exposed_inventory: null;
      occupancy_default: {
        adult_nbr: number;
        children_nbr: number;
        infant_nbr: null;
      };
    }[];
    startingDate: number;
    language: string;
    toBeAssignedEvents: [];
  }, action: PayloadAction<Partial<CalendarDataDetails>>) => {
    adultChildConstraints: {
      adult_max_nbr: number;
      child_max_nbr: number;
      child_max_age: number;
    };
    allowedBookingSources: {
      code: string;
      description: string;
      id: string;
      tag: string;
      type: string;
    }[];
    currency: {
      code: string;
      id: number;
    };
    endingDate: number;
    formattedLegendData: {
      legendData: {
        color: string;
        design: string;
        id: string;
        name: string;
      }[];
      statusId: {
        "IN-HOUSE": {
          id: number;
          clsName: string;
        };
        CONFIRMED: {
          id: number;
          clsName: string;
        };
        "PENDING-CONFIRMATION": {
          id: number;
          clsName: string;
        };
        "SPLIT-UNIT": {
          id: number;
          clsName: string;
        };
        "CHECKED-IN": {
          id: number;
          clsName: string;
        };
        "CHECKED-OUT": {
          id: number;
          clsName: string;
        };
        BLOCKED: {
          id: number;
          clsName: string;
        };
        "BLOCKED-WITH-DATES": {
          id: number;
          clsName: string;
        };
        NOTES: {
          id: number;
          clsName: string;
        };
        "OUTSTANDING-BALANCE": {
          id: number;
          clsName: string;
        };
      };
    };
    is_vacation_rental: boolean;
    legendData: {
      color: string;
      design: string;
      id: string;
      name: string;
    }[];
    roomsInfo: {
      availabilities: number;
      id: number;
      inventory: number;
      name: string;
      rate: number;
      rateplans: {
        id: number;
        name: string;
        rate_restrictions: null;
        variations: {
          adult_child_offering: string;
          adult_nbr: number;
          amount: number;
          child_nbr: number;
        }[];
        totalRooms: number;
        index: number;
        isFirst: boolean;
      }[];
      physicalrooms: {
        calendar_cell: null;
        id: number;
        name: string;
      }[];
      exposed_inventory: null;
      occupancy_default: {
        adult_nbr: number;
        children_nbr: number;
        infant_nbr: null;
      };
    }[];
    startingDate: number;
    language: string;
    toBeAssignedEvents: [];
  };
}, "calendar_data", "calendar_data", import("@reduxjs/toolkit").SliceSelectors<CalendarDataDetails>>;
export declare const addCalendarData: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<CalendarDataDetails, "calendar_data/addCalendarData">, updateCalendarData: import("@reduxjs/toolkit").ActionCreatorWithNonInferrablePayload<"calendar_data/updateCalendarData">;
declare const _default: import("redux").Reducer<CalendarDataDetails>;
export default _default;
