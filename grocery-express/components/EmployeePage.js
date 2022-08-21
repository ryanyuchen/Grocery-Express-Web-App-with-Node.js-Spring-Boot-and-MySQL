import { React } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getLocationOrigin } from "next/dist/shared/lib/utils";
const EmployeePage = () => {
  const { data: session, status } = useSession();
  const role = localStorage.getItem('role')

  
  return (
    // <>
    //   <div className="container mx-auto my-8">
    //     <div className="flex shadow border-b">
    //       <ul>
    //         <li>
    //           <Link href="employee">Click Here to go to Employee Page</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </>
    <>
    <div className="container mx-auto my-8">
      <div className="flex shadow border-b">
        <ul>
          <li>
            <Link href="employee">
              <button className="text-2xl my-5 p-2 font-bold text-blue-900/100">
                Click Here to go to Employee Page
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </>
  );
  
};

export default EmployeePage;