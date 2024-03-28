import React from "react";
import { PageWrapperProps } from "../types/app";
import { Navigation } from "./Navigation";

export const PageWrapper: React.FC<PageWrapperProps> = ({ navProps, children }) => {
  return (
    <div>
     {navProps &&  <Navigation {...navProps} />}
      <div className='pt-28 h-full min-h-screen bg-gray-50'>
        {children}
      </div>
    </div>
  )
}