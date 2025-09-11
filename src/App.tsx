import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, ArrowLeft, Building, Mail, CheckCircle, Clock, DollarSign, AlertTriangle, TrendingDown } from 'lucide-react';



const SavingsCalculator = () => {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [projectSize, setProjectSize] = useState(10000);
  const [competitorType, setCompetitorType] = useState('');
  const [results, setResults] = useState(null);
  const [email, setEmail] = useState('');
  const [showFullReport, setShowFullReport] = useState(false);

  const handleProjectTypeSelect = (type) => {
    setProjectType(type);
  };

  // Competitor cost data from battle cards - using maximum approved spacing for each product
  const competitorData = {
    structocrete: {
      name: 'STRUCTO-CRETE',
      maxterraCost: 4.76,
      competitorCost: 7.46,
      savings: 2.70,
      spacingNote: 'Both products rated for 24" O.C.',
      additionalBenefits: [
        '44-50% material cost savings',
        'No premium pricing without performance benefit',
        'Quartz silica-free formulation'
      ]
    },
    exacor: {
      name: 'EXACOR',
      maxterraCost: 2.95, // MAXTERRA at 24" spacing (optimal)
      competitorCost: 4.32, // EXACOR at 16" spacing (maximum approved)
      savings: 1.37,
      spacingNote: 'MAXTERRA 24" O.C. vs EXACOR 16" O.C. (maximum approved spacing)',
      constructionNote: 'Based on wood open web truss construction',
      additionalBenefits: [
        'Works with 24" O.C. vs 16" O.C. (50% fewer joists)',
        'Compatible with common wood species (S.G. ≥ 0.42)',
        'Non-combustible E136-22 certification'
      ]
    },
    megaboard: {
      name: 'MEGABOARD',
      maxterraCost: 3.20,
      competitorCost: 4.48,
      savings: 1.28,
      spacingNote: 'Both products rated for 24" O.C.',
      additionalBenefits: [
        'No complex installation requirements',
        'Works with standard CFS member sizes',
        'No additional strapping requirements'
      ]
    },
    dragonboard: {
      name: 'DragonBoard',
      maxterraCost: 3.20, // MAXTERRA at 24" spacing
      competitorCost: 4.48, // DragonBoard at 19.2" spacing (maximum approved)
      savings: 1.28,
      spacingNote: 'MAXTERRA 24" O.C. vs DragonBoard 19.2" O.C. (maximum approved spacing)',
      constructionNote: 'Based on CFS open web truss construction',
      additionalBenefits: [
        'ICC-ESR certified vs no certification',
        'Complete diaphragm testing with design equations',
        'Non-combustible E136-22 certification'
      ]
    },
    nocom: {
      name: 'NOCOM',
      maxterraCost: 1.76,
      competitorCost: 2.35,
      savings: 0.59,
      spacingNote: 'Both products at 24" O.C.',
      constructionNote: 'Based on CFS cantilever configuration',
      additionalBenefits: [
        'ICC-ESR certified vs no certification',
        'Third-party validated performance',
        'Complete wet performance testing'
      ]
    }
  };

  const gypcreteData = {
    current: {
      osb: 0.70,
      gypcrete: 2.875, // average of 2.50-3.25
      total: 3.575,
      process: 'Multi-trade, wet installation'
    },
    maxterra: {
      osb: 0.70,
      underlayment: 1.21,
      total: 1.91,
      process: 'Single trade, dry installation'
    }
  };

  const calculateSavings = () => {
    if (projectType === 'gypcrete') {
      const currentCost = gypcreteData.current.total * projectSize;
      const maxterraCost = gypcreteData.maxterra.total * projectSize;
      const savings = currentCost - maxterraCost;
      const percentSavings = ((savings / currentCost) * 100);

      return {
        type: 'gypcrete',
        savings: Math.round(savings),
        percentSavings: Math.round(percentSavings),
        currentCost: Math.round(currentCost),
        maxterraCost: Math.round(maxterraCost),
        currentCostPerSF: gypcreteData.current.total,
        maxterraCostPerSF: gypcreteData.maxterra.total,
        additionalBenefits: [
          'Eliminates 7+ day curing time',
          'Single trade installation vs multi-trade',
          'No moisture introduced into building',
          'Meets code requirements without sound mats'
        ]
      };
    } else {
      const competitor = competitorData[competitorType];
      const currentCost = competitor.competitorCost * projectSize;
      const maxterraCost = competitor.maxterraCost * projectSize;
      const savings = currentCost - maxterraCost;
      const percentSavings = ((savings / currentCost) * 100);

      return {
        type: 'subfloor',
        competitorName: competitor.name,
        savings: Math.round(savings),
        percentSavings: Math.round(percentSavings),
        currentCost: Math.round(currentCost),
        maxterraCost: Math.round(maxterraCost),
        currentCostPerSF: competitor.competitorCost,
        maxterraCostPerSF: competitor.maxterraCost,
        additionalBenefits: competitor.additionalBenefits
      };
    }
  };

  const handleCalculate = () => {
    const calculatedResults = calculateSavings();
    setResults(calculatedResults);
    setStep(3);
  };

  const handleGetFullReport = () => {
    if (email) {
      setShowFullReport(true);
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-12">
         
            <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <Calculator className="w-8 h-8 text-orange-600" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">$</span>
                </div>
              </div>
            <h2 className="font-manrope font-semibold text-[48px] leading-[60px] tracking-[-0.02em] text-gray-900 mb-2">
              What are you looking to replace?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => handleProjectTypeSelect('gypcrete')}
                className={`p-8 border-2 rounded-2xl transition-all duration-200 text-left hover:shadow-lg relative ${
                  projectType === 'gypcrete' 
                    ? 'border-orange-500 bg-white shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl ${
                  projectType === '' ? 'bg-teal-600' : 
                  projectType === 'gypcrete' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                  Wet Gypsum Underlayment
                </h4>
                <p className="text-gray-600 text-base mb-3 leading-relaxed">
                  Replace OSB + Wet Gypsum with MAXTERRA® MgO Fire- And Water-Resistant Underlayment
                </p>
              </button>

              <button
                onClick={() => handleProjectTypeSelect('subfloor')}
                className={`p-8 border-2 rounded-2xl transition-all duration-200 text-left hover:shadow-lg relative ${
                  projectType === 'subfloor' 
                    ? 'border-orange-500 bg-white shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl ${
                  projectType === '' ? 'bg-teal-600' : 
                  projectType === 'subfloor' ? 'bg-orange-500' : 'bg-gray-400'
                }`}></div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Entire Subfloor System</h3>
                <p className="text-gray-600 text-base mb-3 leading-relaxed">
                  Replace subfloor with MAXTERRA® MgO Non-Combustible Single Layer Structural Floor Panels
                </p>
              </button>
            </div>

            {projectType && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center mx-auto"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to project type
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <Calculator className="w-8 h-8 text-orange-600" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">$</span>
                </div>
              </div>
            <h2 className="font-manrope font-semibold text-[36px] leading-[56px] tracking-[-0.03em] text-center text-gray-900 mb-4">Project Details</h2>
            <p className="text-gray-600">Tell us about your project for accurate savings calculations</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Size (sq ft)
              </label>
              <input
                type="number"
                value={projectSize}
                onChange={(e) => setProjectSize(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                min="100"
                step="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Building Type
              </label>
              <select
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              >
                <option value="">Select building type...</option>
                <option value="multifamily">Multi-family Residential</option>
                <option value="hotel">Hotel/Hospitality</option>
                <option value="commercial">Commercial Office</option>
                <option value="retail">Retail/Mixed-use</option>
                <option value="singlefamily">Single-family Residential</option>
                <option value="other">Other</option>
              </select>
            </div>

            {projectType === 'subfloor' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Subfloor Product
                </label>
                <select
                  value={competitorType}
                  onChange={(e) => setCompetitorType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                >
                  <option value="">Select current product...</option>
                  <option value="structocrete">STRUCTO-CRETE</option>
                  <option value="exacor">EXACOR</option>
                  <option value="megaboard">MEGABOARD</option>
                  <option value="dragonboard">DragonBoard</option>
                  <option value="nocom">NOCOM</option>
                </select>
              </div>
            )}

            <div className="text-center pt-4">
              <button
                onClick={handleCalculate}
                disabled={projectType === 'subfloor' && (!competitorType || !buildingType)}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate My Savings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3 && !showFullReport) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <button
              onClick={() => setStep(2)}
              className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to project details
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Potential Savings</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8" />

              </div>
              <h3 className="text-xl font-semibold mb-2">Total Project Savings</h3>
              <p className="text-green-100">That's {results.percentSavings}% less than {results.competitorName || 'gypcrete'}!</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <TrendingDown className="w-8 h-8" />
               
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Savings per SF</h3>
              <p className="text-blue-100">${results.maxterraCostPerSF.toFixed(2)} vs ${results.currentCostPerSF.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Cost Breakdown</h3>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  {results.type === 'gypcrete' ? 'Current System (OSB + Gypcrete)' : `Current System (${results.competitorName})`}
                </h4>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${results.currentCost.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  ${results.currentCostPerSF.toFixed(2)}/sq ft
                </div>
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  {results.type === 'gypcrete' ? 'MAXTERRA System (OSB + Underlayment)' : 'MAXTERRA Subfloor'}
                </h4>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  ${results.maxterraCost.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  ${results.maxterraCostPerSF.toFixed(2)}/sq ft
                </div>
              </div>
            </div>
          </div>

          {results.type === 'subfloor' && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Calculation Details</h4>
              <div className="text-gray-600 text-sm space-y-1">
                <p>• {competitorData[competitorType]?.spacingNote}</p>
                {competitorData[competitorType]?.constructionNote && (
                  <p>• {competitorData[competitorType].constructionNote}</p>
                )}
                <p>• For different framing or construction approaches, contact us for customized analysis</p>
              </div>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Get Your Complete Savings Analysis
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your email to receive a detailed report including risk mitigation benefits, 
              product specifications, and complete competitive analysis.
            </p>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
                <button
                  onClick={handleGetFullReport}
                  disabled={!email}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Get Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full Report View
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-6">
          <button
            onClick={() => setShowFullReport(false)}
            className="flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to savings summary
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Savings Analysis</h2>
          <p className="text-gray-600">Detailed comparison and benefits analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <DollarSign className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">${results.savings.toLocaleString()}</div>
            <h3 className="text-lg font-semibold">Total Savings</h3>
            <p className="text-green-100 text-sm">{results.percentSavings}% cost reduction</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
            <Clock className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">
              {results.type === 'gypcrete' ? '7+' : 'Faster'}
            </div>
            <h3 className="text-lg font-semibold">
              {results.type === 'gypcrete' ? 'Days Saved' : 'Installation'}
            </h3>
            <p className="text-blue-100 text-sm">
              {results.type === 'gypcrete' ? 'No curing time required' : 'Streamlined process'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
            <Building className="w-10 h-10 mb-4" />
            <div className="text-3xl font-bold mb-2">ICC-ESR</div>
            <h3 className="text-lg font-semibold">Certified</h3>
            <p className="text-purple-100 text-sm">Third-party validated performance</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Advantages</h3>
            <div className="space-y-3">
              {results.additionalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Value</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Reduced project liability and risk</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Simplified scheduling and coordination</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Enhanced building performance</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Long-term durability advantages</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white text-center">
          <h3 className="font-manrope font-semibold text-[36px] leading-[56px] tracking-[-0.03em] text-center mb-4">Ready to Start Saving?</h3>
          <p className="mb-6 text-lg">
            These savings are just the beginning. Let's discuss how MAXTERRA can optimize your specific project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Request Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all duration-200">
              Schedule Consultation
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                setStep(1);
                setProjectType('');
                setBuildingType('');
                setCompetitorType('');
                setResults(null);
                setEmail('');
                setShowFullReport(false);
              }}
              className="text-white/80 hover:text-white underline transition-colors duration-200"
            >
              Start New Calculation
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>*Calculations based on documented cost analysis using maximum approved spacing for optimal performance comparison. 
          {results?.type === 'subfloor' && competitorData[competitorType]?.constructionNote && 
            ` ${competitorData[competitorType].constructionNote}.`
          }
          {results?.type === 'subfloor' && 
            ' For different framing or construction approaches, contact us for customized analysis.'
          }
          Actual savings may vary by project and location.</p>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;