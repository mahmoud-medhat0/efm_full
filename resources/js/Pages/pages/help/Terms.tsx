import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import RootLayout from "../../../layout";
const TermsPage = () => {
  const { props } = usePage();
  const terms = props.terms;
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container pt-20">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4">
          Terms of <span className="mark-zigzag">Services</span>
        </h2>
      </div>
      <div className="w-full py-20 pt-16">
        <div className="bg-background p-5 rounded-lg shadow-md space-y-10">
          <div dangerouslySetInnerHTML={{ __html: terms }} />
        </div>
      </div>
    </main>
    </RootLayout>
  );
};

export default TermsPage;
